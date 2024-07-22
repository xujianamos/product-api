const Order = require("../model/order.model");
class OrderService {
  // 创建订单
  async createOrder(order) {
    return await Order.create(order);
  }
  // 根据用户id分页获取订单列表
  async getOrderList({ user_id, pageNum, pageSize, status }) {
    const offset = (pageNum - 1) * pageSize;
    const limit = parseInt(pageSize);
    return await Order.findAndCountAll({
      offset,
      limit,
      where: { user_id, status },
    });
  }

  // 获取订单详情
  async getOrderDetail(query) {
    return await Order.findOne({ where: query });
  }
  // 修改订单
  async updateOrder(query) {
    return await Order.update(
      { status: query.status },
      {
        where: {
          id: query.id,
          user_id: query.user_id,
        },
      }
    );
  }
  // 删除订单
  async deleteOrder(query) {
    return await Order.destroy({ where: query });
  }
  // 获取订单总数
  async getOrderCount(query) {
    return await Order.countDocuments(query);
  }
  // 获取订单总金额
  async getOrderTotal(query) {
    return await Order.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$total",
          },
        },
      },
    ]);
  }
}
module.exports = new OrderService();
