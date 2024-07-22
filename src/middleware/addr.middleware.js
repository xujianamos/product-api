const { addr_data_error } = require("../constant/err.type");
module.exports = {
  // 验证地址相关参数
  validator(rules) {
    return async (ctx, next) => {
      try {
        ctx.verifyParams(rules);
      } catch (error) {
        console.error(error);
        addr_data_error.result = error;
        return ctx.app.emit("error", addr_data_error, ctx);
      }
      await next();
    };
  },
};
