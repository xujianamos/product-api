/**
 * # 用户数据库操作层
 */

// 用户数据表
const User = require("../model/user.model");

class UserService {
  async createUser(user_name, password) {
    // 插入数据
    // User.create({
    // 表的字段
    //   user_name: user_name,
    //   password: password
    // })

    // await表达式: promise对象的值
    const res = await User.create({ user_name, password });
    // console.log(res)

    return res.dataValues;
  }
  /**
   * #查询用户信息
   * @param {*} id
   * @param {*} user_name
   * @param {*} password
   * @param {*} is_admin
   * @returns
   */
  async getUerInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {};

    id && Object.assign(whereOpt, { id });
    user_name && Object.assign(whereOpt, { user_name });
    password && Object.assign(whereOpt, { password });
    is_admin && Object.assign(whereOpt, { is_admin });

    const res = await User.findOne({
      attributes: ["id", "user_name", "password", "is_admin"],
      where: whereOpt,
    });

    return res ? res.dataValues : null;
  }

  /**
   * # 通过用户id更新用户信息
   * @param {*} param0
   * @returns
   */
  async updateById({ id, password, user_name, is_admin }) {
    const whereOpt = { id };

    const newUser = {};
    user_name && Object.assign(newUser, { user_name });
    password && Object.assign(newUser, { password });
    is_admin && Object.assign(newUser, { is_admin });

    const res = await User.update(newUser, { where: whereOpt });

    return res[0] > 0 ? true : false;
  }
}

module.exports = new UserService();
