const { ORDER_FORMAT_ERROR } = require("../constant/err.type");
module.exports = {
  /**
   * ### 验证参数
   * @param {*} rules
   * @returns
   */
  validatorParams(rules) {
    return async (ctx, next) => {
      try {
        ctx.verifyParams(rules);
      } catch (error) {
        console.error(error);
        invalidGoodsId.result = error;
        return ctx.app.emit("error", ORDER_FORMAT_ERROR, ctx);
      }
      await next();
    };
  },
};
