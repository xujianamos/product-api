const Order = require("../models/order.model");
class OrderService {
  // 创建订单
  async createOrder(order) {
    return await Order.create(order);
  }
  // 获取订单列表
  async getOrderList(query) {
    return await Order.find(query);
  }
  // 获取订单详情
  async getOrderDetail(query) {
    return await Order.findOne(query);
  }
  // 修改订单
  async updateOrder(query, order) {
    return await Order.updateOne(query, order);
  }
  // 删除订单
  async deleteOrder(query) {
    return await Order.deleteOne(query);
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
