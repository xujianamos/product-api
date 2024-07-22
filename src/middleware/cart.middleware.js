const { invalidGoodsId, CART_PARAM_ERROR } = require("../constant/err.type");
module.exports = {
  /**
   * # 验证商品ID
   * @param {*} ctx
   * @param {*} next
   * @returns
   */
  async validator(ctx, next) {
    try {
      ctx.verifyParams({
        goods_id: { type: "number", required: true, desc: "商品ID" },
      });
    } catch (error) {
      console.error(error);
      invalidGoodsId.result = error;
      return ctx.app.emit("error", invalidGoodsId, ctx);
    }
    await next();
  },
  /**
   * 使用闭包验证(支持外部自定义验证参数)
   */
  validatorParams(rules) {
    return async (ctx, next) => {
      try {
        ctx.verifyParams(rules);
      } catch (error) {
        console.error(error);
        invalidGoodsId.result = error;
        return ctx.app.emit("error", CART_PARAM_ERROR, ctx);
      }
      await next();
    };
  },
};
