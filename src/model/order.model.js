const { DataTypes } = require("sequelize");
const seq = require("../db/seq");
const Order = seq.define("zd_orders", {
  order_number: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true,
    comment: "订单号",
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
    comment: "订单状态(0:未支付,1:已支付,2:已发货,3:已签收,4:已取消)",
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "用户id",
  },
  address_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "地址id",
  },
  goods_info: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "商品信息",
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: "订单总金额",
  },
});
// 创建表
// node ./src/model/order.model.js
// Order.sync({ force: true });
module.exports = Order;
