const jwt = require("jsonwebtoken");
// 数据库操作
const {
  createUser,
  getUerInfo,
  updateById,
} = require("../service/user.service");
// 错误类型
const { userRegisterError } = require("../constant/err.type");

const { JWT_SECRET } = require("../config/config.default");
class UserController {
  /**
   * # 注册用户
   * @param {} ctx
   * @param {*} next
   */
  async register(ctx, next) {
    // 1. 获取数据
    const { user_name, password } = ctx.request.body;

    try {
      // 2. 操作数据库
      const res = await createUser(user_name, password);
      // 3. 返回结果
      ctx.body = {
        code: 0,
        message: "用户注册成功",
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (error) {
      console.error(error);
      ctx.app.emit("error", userRegisterError, ctx);
    }
  }

  /**
   * # 登录
   * @param {*} ctx
   * @param {*} next
   */
  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    console.log("JWT_SECRET", JWT_SECRET);
    // 1. 获取用户信息(在token的payload中, 记录id, user_name, is_admin)
    try {
      // 从返回结果对象中剔除password属性, 将剩下的属性放到res对象
      const { password, ...res } = await getUerInfo({ user_name });

      ctx.body = {
        code: 0,
        message: "用户登录成功",
        result: {
          // 1d:过期时间为一天
          token: jwt.sign(res, JWT_SECRET, { expiresIn: "1d" }),
        },
      };
    } catch (err) {
      console.error("用户登录失败", err);
    }
  }
  /**
   * #修改密码
   * @param {*} ctx
   * @param {*} next
   */
  async updatePassword(ctx, next) {
    const id = ctx.state.user.id;
    const password = ctx.request.body.password;
    try {
      const res = await updateById({ id, password });
      if (res) {
        ctx.body = {
          code: 0,
          message: "修改密码成功",
          result: {},
        };
      }
    } catch (error) {
      console.error("修改密码失败", error);
      ctx.body = {
        code: 10007,
        message: "修改密码失败",
        result: {},
      };
    }
  }
}

module.exports = new UserController();
