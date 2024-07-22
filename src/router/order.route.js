const Router = require("koa-router");
const router = new Router({ prefix: "/orders" });
const { auth } = require("../middleware/auth.middleware");
const { validatorParams } = require("../middleware/order.middleware");
const {
  create,
  list,
  detail,
  remove,
  update,
} = require("../controller/order.controller");
// 获取订单列表
router.get("/", auth, list);
// 获取订单详情
router.get("/:id", auth, detail);
// 创建订单
router.post(
  "/",
  auth,
  validatorParams({
    address_id: "string",
    goods_info: "string",
    total: "string",
  }),
  create
);
// 更新订单
router.patch("/:id", auth, update);
// 删除订单
router.delete("/:id", auth, remove);

module.exports = router;
