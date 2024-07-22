const Router = require("koa-router");
const router = new Router({ prefix: "/orders" });
const { auth } = require("../middleware/auth.middleware");
const { validatorParams } = require("../middleware/order.middleware");
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/order.controller");
// 获取订单列表
router.get("/", auth, getOrders);
// 获取订单详情
router.get("/:id", auth, getOrder);
// 创建订单
router.post(
  "/",
  auth,
  validatorParams({
    address_id: "int",
    goods_info: "string",
    total: "string",
  }),
  create
);
// 更新订单
router.put("/:id", auth, updateOrder);
// 删除订单
router.delete("/:id", auth, deleteOrder);

module.exports = router;
