const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/config.default");

const {
  tokenExpiredError,
  invalidToken,
  hasNotAdminPermission,
} = require("../constant/err.type");

/**
 * # 验证用户是否登录
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  const token = authorization.replace("Bearer ", "");
  console.log(token);

  try {
    // user中包含了payload的信息(id, user_name, is_admin)
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user;
  } catch (err) {
    switch (err.name) {
      case "TokenExpiredError":
        console.error("token已过期", err);
        return ctx.app.emit("error", tokenExpiredError, ctx);
      case "JsonWebTokenError":
        console.error("无效的token", err);
        return ctx.app.emit("error", invalidToken, ctx);
    }
  }

  await next();
};

/**
 * # 验证用户是否是管理员
 * @param {} ctx
 * @param {*} next
 * @returns
 */
const hadAdminPermission = async (ctx, next) => {
  const { is_admin } = ctx.state.user;
  if (is_admin) {
    await next();
  } else {
    console.error("权限不足");
    return ctx.app.emit("error", hasNotAdminPermission, ctx);
  }
};

module.exports = {
  auth,
  hadAdminPermission,
};
