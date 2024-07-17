const Router = require("koa-router");

const { upload, create } = require("../controller/goods.controller");
const { auth, hadAdminPermission } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/goods.middleware");

const router = new Router({ prefix: "/goods" });

// 商品图片上传
router.post("/upload", auth, hadAdminPermission, upload);

// 发布商品
router.post("/", auth, hadAdminPermission, validator, create);

module.exports = router;
