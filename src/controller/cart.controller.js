const {
  createOrUpdateCart,
  findAll,
  updateCart,
  removeCarts,
  selectAllCarts,
  unSelectAllCarts,
} = require("../service/cart.service");
const { CART_PARAM_ERROR } = require("../constant/err.type");
/**
 * @description 购物车
 */
class CartsController {
  // 添加购物车
  async addCart(ctx, next) {
    try {
      const user_id = ctx.state.user.id;
      const goods_id = ctx.request.body.goods_id;
      const res = await createOrUpdateCart(user_id, goods_id);
      if (res) {
        ctx.body = {
          code: 0,
          message: "添加购物车成功",
          result: res,
        };
      } else {
        ctx.body = {
          code: 1,
          message: "添加购物车失败",
          result: res,
        };
      }
    } catch (error) {
      console.error(error);
    }
  }
  // 获取购物车列表
  async getCartList(ctx, next) {
    try {
      const { pageNum = 1, pageSize = 10 } = ctx.request.query;

      const res = await findAll(pageNum, pageSize);

      if (res) {
        ctx.body = {
          code: 0,
          message: "获取购物车列表成功",
          result: res,
        };
      }
    } catch (error) {
      console.error(error);
    }
  }
  // 更新购物车
  async updateCart(ctx, next) {
    try {
      const { id } = ctx.request.params;
      const { number, selected } = ctx.request.body;
      console.log("number", number);
      console.log("selected", selected);
      if (number === undefined && selected === undefined) {
        CART_PARAM_ERROR.message = "number和selected不能同时为空";
        return ctx.app.emit("error", CART_PARAM_ERROR, ctx);
      }
      const res = await updateCart({ id, number, selected });
      if (res) {
        ctx.body = {
          code: 0,
          message: "更新购物车成功",
          result: res,
        };
      }
    } catch (error) {
      console.error(error);
    }
  }
  // 修改购物车商品数量
  async updateCartNum(ctx, next) {
    ctx.body = "修改购物车商品数量";
  }
  // 修改购物车商品选中状态
  async updateCartChecked(ctx, next) {
    ctx.body = "修改购物车商品选中状态";
  }
  // 删除购物车商品
  async remove(ctx, next) {
    try {
      const { ids } = ctx.request.body;
      const res = await removeCarts(ids);
      console.log("res", res);
    } catch (error) {
      console.error(error);
    }
  }
  // 清空购物车
  async clearCart(ctx, next) {
    ctx.body = "清空购物车";
  }
  // 获取购物车商品数量
  async getCartNum(ctx, next) {
    ctx.body = "获取购物车商品数量";
  }
  /**
   * 全选中
   */
  async selectAll(ctx, next) {
    try {
      const user_id = ctx.state.user.id;
      const res = await selectAllCarts(user_id);
      ctx.body = {
        code: 0,
        message: "全选中",
        result: res,
      };
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * 全不选中
   */
  async unSelectAll(ctx, next) {
    try {
      const user_id = ctx.state.user.id;
      const res = await unSelectAllCarts(user_id);
      ctx.body = {
        code: 0,
        message: "全不选中",
        result: res,
      };
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * 更新
   */
}

module.exports = new CartsController();
