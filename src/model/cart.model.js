const { DataTypes } = require("sequelize");
const seq = require("../db/seq");
const GoodsModel = require("./goods.model");

const Cart = seq.define("zd_carts", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "用户id",
  },
  goods_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "商品id",
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: "商品数量",
  },
  selected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: "是否选中",
  },
});
Cart.belongsTo(GoodsModel, {
  foreignKey: "goods_id",
  // targetKey: "id",
  as: "goods_info",
});
// 创建表
// Cart.sync({ alter: true });
module.exports = Cart;
