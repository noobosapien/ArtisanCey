"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      data.product = ctx.query.id;
      entity = await strapi.services.review.create(data, { files });
    } else {
      ctx.request.body.product = ctx.query.id;
      entity = await strapi.services.review.create(ctx.request.body);
    }

    await strapi.services.review.average(entity.product.id);
    const data = sanitizeEntity(entity, { model: strapi.models.review });

    return data;
  },
};
