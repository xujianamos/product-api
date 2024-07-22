const Router = require("koa-router");

const {
  upload,
  create,
  update,
  remove,
  off,
  on,
  list,
  detail,
} = require("../controller/goods.controller");
const { auth, hadAdminPermission } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/goods.middleware");

const router = new Router({ prefix: "/goods" });

// 商品图片上传
router.post("/upload", auth, hadAdminPermission, upload);

// 发布商品
router.post("/", auth, hadAdminPermission, validator, create);
// 修改商品
router.put("/:id", auth, hadAdminPermission, validator, update);
// 删除接口
router.delete("/:id", auth, hadAdminPermission, remove);
// 下架商品
router.put("/:id/off", auth, hadAdminPermission, off);
// 上架商品
router.put("/:id/on", auth, hadAdminPermission, on);
// 获取商品列表
router.get("/", auth, hadAdminPermission, list);
// 获取商品详情
router.get("/:id", auth, hadAdminPermission, detail);

module.exports = router;
