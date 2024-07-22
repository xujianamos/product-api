const {
  createAddr,
  getAddrList,
  deleteAddr,
  setDefaultAddr,
  updateAddr,
} = require("../service/addr.service");
class AddrController {
  // 获取地址列表
  async list(ctx) {
    try {
      const user_id = ctx.state.user.id;
      const result = await getAddrList(user_id);
      ctx.body = {
        code: 0,
        message: "添加购物车成功",
        result: result,
      };
    } catch (error) {
      console.error(error);
      return ctx.app.emit("error", error, ctx);
    }
  }
  // 添加地址
  async create(ctx) {
    try {
      const user_id = ctx.state.user.id;
      const res = await createAddr({ ...ctx.request.body, user_id });
      ctx.body = {
        code: 0,
        message: "添加地址成功",
        result: res,
      };
    } catch (error) {
      console.error(error);
      return ctx.app.emit("error", error, ctx);
    }
  }
  // 删除地址
  async remove(ctx) {
    try {
      const { id } = ctx.request.params;
      const result = await deleteAddr(id);
      ctx.body = {
        code: 0,
        message: "删除地址成功",
        result: result,
      };
    } catch (error) {
      console.error(error);
      return ctx.app.emit("error", error, ctx);
    }
  }
  // 修改地址
  async update(ctx) {
    try {
      const { id } = ctx.request.params;
      const result = await updateAddr(id, ctx.request.body);
      ctx.body = {
        code: 0,
        message: "修改地址成功",
        result: result,
      };
    } catch (error) {
      console.error(error);
      return ctx.app.emit("error", error, ctx);
    }
  }
  // 设置默认地址
  async setDefault(ctx) {
    try {
      const user_id = ctx.state.user.id;
      const { id } = ctx.request.params;
      const res = await setDefaultAddr(user_id, id);
      ctx.body = {
        code: 0,
        message: "设置默认地址成功",
        result: res,
      };
    } catch (error) {
      console.error(error);
      return ctx.app.emit("error", error, ctx);
    }
  }
}
module.exports = new AddrController();
