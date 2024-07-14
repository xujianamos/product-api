const bcrypt = require("bcryptjs");
const { getUerInfo } = require("../service/user.service");
const {
  userFormateError,
  userAlreadyExited,
  userRegisterError,
  userDoesNotExist,
  userLoginError,
  invalidPassword,
} = require("../constant/err.type");
/**
 * #验证用户或密码是否为空
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  // 合法性
  if (!user_name || !password) {
    console.error("用户名或密码为空", ctx.request.body);
    ctx.app.emit("error", userFormateError, ctx);
    return;
  }

  await next();
};

/**
 * # 验证用户是否已存在
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body;

  /**
   * #错误写法：以下判断恒为真，因为getUerInfo返回的结果是promise
   */
  // if (getUerInfo({ user_name })) {
  //   ctx.app.emit("error", userAlreadyExited, ctx);
  //   return;
  // }
  /**
   * #方式1:使用await
   * getUerInfo返回的是promise，因此需要使用await，不然求值结果始终是真
   */
  // if (await getUerInfo({ user_name })) {
  //   ctx.app.emit("error", userAlreadyExited, ctx);
  //   return;
  // }
  /**
   * #方式2:使用try catch
   */
  try {
    const res = await getUerInfo({ user_name });
    if (res) {
      console.error("用户名已经存在", { user_name });
      ctx.app.emit("error", userAlreadyExited, ctx);
      return;
    }
  } catch (error) {
    console.error("获取用户信息错误", error);
    ctx.app.emit("error", userRegisterError, ctx);
    return;
  }

  await next();
};

/**
 * # 加密密码
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;

  const salt = bcrypt.genSaltSync(10);
  // hash保存的是 密文
  const hash = bcrypt.hashSync(password, salt);

  ctx.request.body.password = hash;

  await next();
};
const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  try {
    // 1. 判断用户是否存在(不存在:报错)
    const res = await getUerInfo({ user_name });
    console.log("res", res);
    if (!res) {
      console.error("用户名不存在", { user_name });
      ctx.app.emit("error", userDoesNotExist, ctx);
      return;
    }
    // 2. 密码是否匹配(不匹配: 报错)
    if (!bcrypt.compareSync(password, res.password)) {
      console.error("password", res.password);
      ctx.app.emit("error", invalidPassword, ctx);
      return;
    }
  } catch (error) {
    console.error(error);
    ctx.app.emit("error", userLoginError, ctx);
  }

  await next();
};

/**
 * #用户中间件
 */
module.exports = {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin,
};
