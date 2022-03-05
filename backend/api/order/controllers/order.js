"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const crypto = require("crypto");
const { sanitizeEntity } = require("strapi-utils");
const stripe = require("stripe")(process.env.STRIPE_SK);

module.exports = {
  async place(ctx) {
    const {
      items,
      country,
      shippingAddress,
      billingAddress,
      shippingOption,
      subtotal,
      total,
      orderId,
    } = ctx.request.body;

    var guest;

    const algorithm = "aes-256-ctr";
    const secretKey = process.env.SECRET_KEY;
    const iv = crypto.randomBytes(16);

    const encrypt = (text) => {
      const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

      const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

      return {
        iv: iv.toString("hex"),
        content: encrypted.toString("hex"),
      };
    };

    const decrypt = (hash) => {
      const decipher = crypto.createDecipheriv(
        algorithm,
        secretKey,
        Buffer.from(hash.iv, "hex")
      );

      const decrpyted = Buffer.concat([
        decipher.update(Buffer.from(hash.content, "hex")),
        decipher.final(),
      ]);

      return decrpyted.toString();
    };

    try {
      await Promise.all(
        items.map(async (clientItem) => {
          const serverItem = await strapi.services.product.findOne({
            id: clientItem.id,
          });

          // await strapi.services.product.update(
          //   { id: clientItem.id },
          //   {
          //     stock: serverItem.stock - clientItem.quantity,
          //   }
          // );
        })
      );
    } catch (e) {
      console.log(e);
    }

    guest = await strapi.services.guests.findOne({
      email: shippingAddress.email.value,
    });

    if (!guest) {
      guest = await strapi.services.guests.create({
        first_name: shippingAddress.firstName.value,
        last_name: shippingAddress.lastName.value,
        email: shippingAddress.email.value,
      });
    }

    const data = {
      email: shippingAddress.email.value,
      orderId,
    };

    const toEncrypt = JSON.stringify(data);
    const encrypted = await encrypt(toEncrypt);

    var orderItems = [];
    items.forEach((item) => {
      orderItems.push({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
      });
    });

    const orderObject = {
      items: JSON.stringify(orderItems),
      shippingAddress: JSON.stringify({
        firstName: shippingAddress.firstName.value,
        lastName: shippingAddress.lastName.value,
        address: shippingAddress.address.value,
        apartment: shippingAddress.apartment.value,
        city: shippingAddress.city.value,
        region: shippingAddress.region.value,
        zipCode: shippingAddress.zipCode.value,
        country,
      }),

      billingAddress: JSON.stringify({
        firstName: shippingAddress.firstName.value,
        lastName: shippingAddress.lastName.value,
        address: shippingAddress.address.value,
        apartment: shippingAddress.apartment.value,
        city: shippingAddress.city.value,
        region: shippingAddress.region.value,
        zipCode: shippingAddress.zipCode.value,
        country,
      }),

      shippingInfo: JSON.stringify({
        firstName: shippingAddress.firstName.value,
        lastName: shippingAddress.lastName.value,
        email: shippingAddress.email.value,
        phone: shippingAddress.phone.value,
      }),

      billingInfo: JSON.stringify({
        firstName: shippingAddress.firstName.value,
        lastName: shippingAddress.lastName.value,
        email: shippingAddress.email.value,
        phone: shippingAddress.phone.value,
      }),

      shippingOption: JSON.stringify(shippingOption),

      subtotal: Number(subtotal),
      total: Number(total),
      status: "wearhouse",

      orderLink: encrypted.content,
      orderEncObj: JSON.stringify(encrypted),
      orderId,
    };

    var order = await strapi.services.order.create(orderObject);

    order = sanitizeEntity(order, { model: strapi.models.order });

    await strapi.services.guests.update(
      { id: guest.id },
      {
        orders: [...guest.orders, order],
      }
    );

    return {
      message: "success",
      link: order.orderLink,
    };

    // ctx.send({ order }, 200);
  },

  async process(ctx) {
    const { items, total, shippingOption, idempotencyKey, shippingAddress } =
      ctx.request.body;

    try {
      let serverTotal = 0;
      let unavailable = [];

      const shippingVariants = [
        { label: "standard", price: 10 },
        { label: "express", price: 20 },
      ];

      await Promise.all(
        items.map(async (clientItem) => {
          const serverItem = await strapi.services.product.findOne({
            id: clientItem.id,
          });

          if (serverItem.stock < clientItem.qty) {
            unavailable.push({ id: serverItem.id, qty: serverItem.stock });
          }

          serverTotal += serverItem.price * clientItem.quantity;
        })
      );

      const shippingValid = shippingVariants.find(
        (option) =>
          option.label === shippingOption.label &&
          option.price === shippingOption.price
      );

      if (
        shippingValid === undefined ||
        Number(serverTotal + shippingValid.price).toFixed(2) !==
          Number(total).toFixed(2)
      ) {
        // ctx.send({ error: "invalid cart" }, 400);
        console.error(
          shippingValid,
          Number(serverTotal + shippingValid.price).toFixed(2),
          Number(total).toFixed(2)
        );
        return { error: "invalid cart" };
      } else if (unavailable.length > 0) {
        // ctx.send({ unavailable }, 409);
        return { unavailable };
      } else {
        var guest = await strapi.services.guests.findOne({
          email: shippingAddress.email.value,
        });

        if (!guest) {
          guest = await strapi.services.guests.create({
            first_name: shippingAddress.firstName.value,
            last_name: shippingAddress.lastName.value,
            email: shippingAddress.email.value,
          });
        }

        const intent = await stripe.paymentIntents.create(
          {
            amount: Number((serverTotal + shippingValid.price) * 100).toFixed(
              0
            ),
            currency: "usd",
            receipt_email: shippingAddress.email.value,
          },
          { idempotencyKey }
        );

        return { client_secret: intent.client_secret, intentID: intent.id };
      }
    } catch (e) {
      console.log(e);
    }
  },
};
