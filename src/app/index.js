const path = require("path");

const Koa = require("koa");
const { koaBody } = require("koa-body");
const KoaStatic = require("koa-static");
const parameter = require("koa-parameter");

// const userRouter = require("../router/user.route");

const router = require("../router/index");

const errHandler = require("./errHandler");
const app = new Koa();

app.use(
  koaBody({
    multipart: true, // 开启文件上传
    formidable: {
      // 上传文件目录(不推荐使用相对路径)
      uploadDir: path.join(__dirname, "/public/uploads"),
      // 保留文件扩展名
      keepExtensions: true,
    },
    parsedMethods: ["POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(KoaStatic(path.join(__dirname, "/public/uploads")));

app.use(parameter(app));
// app.use(userRouter.routes());
app.use(router.routes());
// 只支持http实现的请求方法
app.use(router.allowedMethods());
// 统一的错误处理
app.on("error", errHandler);
module.exports = app;
