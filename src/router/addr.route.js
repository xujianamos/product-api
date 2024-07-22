const Router = require("koa-router");
const router = new Router({ prefix: "/address" });
const { auth } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/addr.middleware");
const {
  create,
  remove,
  list,
  update,
  setDefault,
} = require("../controller/addr.controller");
// 地址列表
router.get("/", auth, list);
// 添加地址
router.post(
  "/",
  auth,
  validator({
    consignee: "string",
    phone: { type: "string", pattern: /^1[3456789]\d{9}$/ },
    address: "string",
  }),
  create
);
// 修改地址
router.put(
  "/:id",
  auth,
  validator({
    consignee: "string",
    phone: { type: "string", pattern: /^1[3456789]\d{9}$/ },
    address: "string",
  }),
  update
);
// 删除地址
router.delete("/:id", auth, remove);
// 设置默认地址
router.patch("/:id", auth, setDefault);
module.exports = router;
