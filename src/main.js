/**
 * 项目主入口文件
 */

const { APP_PORT } = require("./config/config.default");

// 引入app（入口文件这样不限制app使用什么框架去实现，）
const app = require("./app");

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
});
