const KoaRouter = require("koa-router");

const router = new KoaRouter({ prefix: "/carts" });
const { auth, hadAdminPermission } = require("../middleware/auth.middleware");
const { isExist } = require("../controller/goods.controller");
const { validatorParams } = require("../middleware/cart.middleware");
const {
  addCart,
  getCartList,
  selectAll,
  unSelectAll,
  getCartNum,
  remove,
  updateCartNum,
  updateCart,
} = require("../controller/cart.controller");
// 添加购物车
router.post(
  "/",
  auth,
  hadAdminPermission,
  validatorParams({ goods_id: "number" }),
  addCart
);
// 获取购物车列表
router.get("/", auth, getCartList);
// 删除购物车商品
router.delete(
  "/",
  auth,
  validatorParams({
    ids: "array",
  }),
  remove
);
// 更新购物车
router.patch(
  "/:id",
  auth,
  validatorParams({
    number: { type: "number", required: false },
    selected: { type: "bool", required: false },
  }),
  updateCart
);
// 全选中
router.post("/selectAll", auth, selectAll);
// 全不选中
router.post("/unSelectAll", auth, unSelectAll);
// 获取购物车数量
router.get("/:id", auth, getCartNum);

module.exports = router;
