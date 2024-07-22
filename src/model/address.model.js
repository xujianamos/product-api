const { DataTypes } = require("sequelize");
const seq = require("../db/seq");

const Address = seq.define("zd_addresses", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "用户id",
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "手机号",
  },
  is_default: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: "是否默认",
  },
  consignee: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "收货人姓名",
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "收货人地址",
  },
});
// node ./src/model/address.model.js
// Address.sync({ force: true });

module.exports = Address;
