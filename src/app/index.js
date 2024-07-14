const Koa = require("koa");
const { koaBody } = require("koa-body");

// const userRouter = require("../router/user.route");

const router = require("../router/index");

const errHandler = require("./errHandler");
const app = new Koa();

app.use(koaBody());

// app.use(userRouter.routes());
app.use(router.routes());
// 只支持http实现的请求方法
app.use(router.allowedMethods());
// 统一的错误处理
app.on("error", errHandler);
module.exports = app;
