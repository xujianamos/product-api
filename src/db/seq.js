const { Sequelize } = require("sequelize");

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
} = require("../config/config.default");

const seq = new Sequelize("zdsc", "root", "12345678", {
  host: "localhost",
  dialect: "mysql",
});

/**
 * 测试连接数据库是否成功
 */

// seq
//   .authenticate()
//   .then(() => {
//     console.log("数据库连接成功");
//   })
//   .catch((err) => {
//     console.log("数据库连接失败", err);
//   });

module.exports = seq;
