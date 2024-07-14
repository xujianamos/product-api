const Router = require("koa-router");

// 用户相关中间件
const {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin,
} = require("../middleware/user.middleware");

const { auth } = require("../middleware/auth.middleware");

// 用户相关控制器，处理业务逻辑
const {
  register,
  login,
  updatePassword,
} = require("../controller/user.controller");

/**
 * 用户相关路由
 * prefix：给路由添加前缀：当路由有前缀时，子路由无需添加前缀
 * 示例：/register路由实际上是/users/register
 */
const router = new Router({ prefix: "/users" });

// 注册接口
router.post("/register", userValidator, verifyUser, cryptPassword, register);

// 登录接口
router.post("/login", userValidator, verifyLogin, login);

// 修改密码
router.patch("/:id/password", auth, cryptPassword, updatePassword);

module.exports = router;
