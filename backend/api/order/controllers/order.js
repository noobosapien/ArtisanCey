"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async place(ctx) {
    const {
      items,
      shippingAddress,
      billingAddress,
      shippingInfo,
      billingInfo,
      shippingOption,
      subtotal,
      total,
      status,
      orderLink,
      orderId,
    } = ctx.request.body;

    let orderCustomer;

    let serverTotal = 0;
    let unavailable = [];

    await Promise.all(
      items.map(async (clientItem) => {
        const serverItem = await strapi.services.product.findOne({
          id: clientItem.product.id,
        });

        if (serverItem.stock < clientItem.qty) {
          unavailable.push({ id: serverItem.id, qty: serverItem.stock });
        } else {
          await strapi.services.product.update(
            { id: clientItem.product.id },
            {
              stock: serverItem.stock - clientItem.qty,
            }
          );
        }

        serverTotal += serverItem.price * clientItem.qty;
      })
    );

    const shippingVariants = [
      { label: "Standard", price: 7.5 },
      { label: "Express", price: 10.5 },
    ];

    const shippingValid = shippingVariants.find(
      (option) =>
        option.label === shippingOption.label &&
        option.price === shippingOption.price
    );

    if (
      shippingValid === undefined ||
      Number((serverTotal + shippingValid.price).toFixed(2)) !== Number(total)
    ) {
      ctx.send({ error: "invalid cart" }, 400);
    } else if (unavailable.length > 0) {
      ctx.send({ unavailable }, 409);
    } else {
      //check whether the email is present in a guest account
      //push order to that account
      //orelse create a new guest account with the shipping info and add this order
      var guest = await strapi.services.guests.findOne({
        email: shippingInfo.email,
      });

      if (!guest) {
        guest = await strapi.services.guests.create({
          first_name: shippingInfo.firstName,
          last_name: shippingInfo.lastName,
          email: shippingInfo.email,
        });
      }

      var order = await strapi.services.order.create({
        items,
        shippingAddress,
        billingAddress,
        shippingInfo,
        billingInfo,
        shippingOption,
        subtotal,
        total,
        status,
        orderLink,
        orderId,
      });

      order = sanitizeEntity(order, { model: strapi.models.order });

      await strapi.services.guests.update(
        { id: guest.id },
        {
          orders: [...guest.orders, order],
        }
      );

      ctx.send({ order }, 200);
    }
  },
};
