const { goodsFormatError } = require("../constant/err.type");
module.exports = {
  validator: async (ctx, next) => {
    try {
      ctx.verifyParams({
        goods_name: { type: "string", required: true, desc: "商品名称" },
        goods_price: { type: "number", required: true, desc: "商品价格" },
        goods_num: { type: "number", required: true, desc: "商品描述" },
        goods_image: { type: "string", required: true, desc: "商品图片" },
      });
    } catch (error) {
      goodsFormatError.result = error;
      return ctx.app.emit("error", goodsFormatError, ctx);
    }
    await next();
  },
};
