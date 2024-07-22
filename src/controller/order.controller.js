const { createOrder } = require("../service/order.service");
class OrderController {
  // 创建订单
  async create(ctx, next) {
    try {
      const user_id = ctx.state.user.id;
      const { address_id, goods_info, total } = ctx.request.body;
      const order_number = Date.now() + "" + Math.floor(Math.random() * 1000);
      const res = await createOrder({
        user_id,
        address_id,
        goods_info,
        total,
        order_number,
      });
      ctx.body = {
        code: 0,
        message: "创建订单成功",
        result: res,
      };
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = new OrderController();
