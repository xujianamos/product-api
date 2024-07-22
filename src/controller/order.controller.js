const {
  createOrder,
  getOrderList,
  getOrderDetail,
  deleteOrder,
  updateOrder,
} = require("../service/order.service");
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
  // 获取订单列表
  async list(ctx) {
    try {
      const { pageNum = 1, pageSize = 10, status = 0 } = ctx.request.query;
      const { id } = ctx.state.user;
      const res = await getOrderList({
        user_id: id,
        pageNum,
        pageSize,
        status,
      });
      ctx.body = {
        code: 0,
        message: "获取订单列表成功",
        result: res,
      };
    } catch (error) {
      console.error(error);
    }
  }
  // 获取订单详情
  async detail(ctx, next) {
    try {
      const user_id = ctx.state.user.id;
      const { id } = ctx.request.params;
      const res = await getOrderDetail({
        user_id: user_id,
        id,
      });
      ctx.body = {
        code: 0,
        message: "获取订单详情成功",
        result: res,
      };
    } catch (error) {}
  }
  // 取消订单
  async cancel(ctx, next) {
    try {
      const user_id = ctx.state.user.id;
      const { id } = ctx.request.params;
      const res = await cancelOrder({
        user_id: user_id,
        id,
      });
      ctx.body = {
        code: 0,
        message: "取消订单成功",
        result: res,
      };
    } catch (error) {
      console.log(error);
    }
  }
  // 删除订单
  async remove(ctx, next) {
    try {
      const user_id = ctx.state.user.id;
      const { id } = ctx.request.params;
      const res = await deleteOrder({
        user_id: user_id,
        id,
      });
      ctx.body = {
        code: 0,
        message: "删除订单成功",
        result: res,
      };
    } catch (error) {
      console.log(error);
    }
  }
  // 修改订单
  async update(ctx, next) {
    try {
      const user_id = ctx.state.user.id;
      const { id } = ctx.request.params;
      const { status } = ctx.request.body;
      const res = await updateOrder({
        user_id: user_id,
        id,
        status,
      });
      ctx.body = {
        code: 200,
        message: "修改订单成功",
        result: res,
      };
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = new OrderController();
