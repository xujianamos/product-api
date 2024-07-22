const path = require("path");
const {
  uploadFileError,
  unSupportedFileType,
  createGoodsError,
  updateGoodsError,
  invalidGoodsId,
  getProductDetailError,
  getGoodsListError,
  invalidParams,
  removeGoodsError,
} = require("../constant/err.type");

const {
  createGoods,
  updateGoods,
  getGoodsDetail,
  getGoodsList,
  removeGoods,
  restoreGoods,
} = require("../service/goods.service");
class GoodsController {
  /**
   * 上传商品图片
   * @param {s} ctx
   * @param {*} next
   * @returns
   */
  async upload(ctx, next) {
    const { file } = ctx.request.files;
    const fileTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (file) {
      if (!fileTypes.includes(file.type)) {
        return ctx.app.emit("error", unSupportedFileType, ctx);
      }
      ctx.body = {
        code: 0,
        message: "商品图片上传成功",
        result: {
          goods_img: path.basename(file.path),
        },
      };
    } else {
      return ctx.app.emit("error", uploadFileError, ctx);
    }
  }
  /**
   * 获取商品列表
   * @param {} ctx
   */
  async list(ctx) {
    try {
      console.log("ctx", ctx.request.query);
      const { pageNum, pageSize } = ctx.request.query;
      const res = await getGoodsList(pageNum, pageSize);
      if (!res) return ctx.app.emit("error", invalidParams, ctx);
      ctx.body = {
        code: 0,
        message: "获取商品列表成功",
        result: res,
      };
    } catch (error) {
      console.error(error);
      return ctx.app.emit("error", getGoodsListError, ctx);
    }
  }
  /**
   * 获取商品详情
   * @param {*} ctx
   */
  async detail(ctx) {
    try {
      const res = await getGoodsDetail(ctx.params.id);
      if (!res) return ctx.app.emit("error", invalidGoodsId, ctx);
      ctx.body = {
        code: 0,
        message: "获取商品详情成功",
        result: res,
      };
    } catch (error) {
      console.error(error);
      return ctx.app.emit("error", getProductDetailError, ctx);
    }
  }
  /**
   * 修改商品
   * @param {*} ctx
   * @returns
   */
  async update(ctx) {
    try {
      const res = await updateGoods(ctx.params.id, ctx.request.body);
      if (!res) return ctx.app.emit("error", invalidGoodsId, ctx);
      ctx.body = {
        code: 0,
        message: "更新商品成功",
        result: res,
      };
    } catch (error) {
      console.error(error);
      return ctx.app.emit("error", updateGoodsError, ctx);
    }
  }
  /**
   * 最后一个调用的控制器不需要写next
   * @param {} ctx
   */
  async create(ctx) {
    try {
      const res = await createGoods(ctx.request.body);
      ctx.body = {
        code: 0,
        message: "创建商品成功",
        result: res,
      };
    } catch (error) {
      console.error(error);
      return ctx.app.emit("error", createGoodsError, ctx);
    }
  }
  /**
   * 删除商品
   * @param {*} ctx
   */
  async remove(ctx) {
    try {
      const res = await removeGoods(ctx.params.id);
      if (!res) return ctx.app.emit("error", invalidGoodsId, ctx);
      ctx.body = {
        code: 0,
        message: "删除商品成功",
        result: res,
      };
    } catch (error) {
      console.error(error);
      return ctx.app.emit("error", removeGoodsError, ctx);
    }
  }
  /**
   * 批量删除商品
   * @param {*} ctx
   */
  async removeList(ctx) {
    try {
    } catch (error) {
      console.error(error);
      return ctx.app.emit("error", createGoodsError, ctx);
    }
  }
  // 上架商品
  async on(ctx) {
    try {
      const res = await restoreGoods(ctx.params.id);
      if (!res) return ctx.app.emit("error", invalidGoodsId, ctx);
      return (ctx.body = {
        code: 0,
        message: "上架商品成功",
        result: res,
      });
    } catch (error) {
      console.error(error);
      return ctx.app.emit("error", createGoodsError, ctx);
    }
  }
  // 下架商品
  async off(ctx) {
    try {
      const res = await removeGoods(ctx.params.id);
      if (!res) return ctx.app.emit("error", invalidGoodsId, ctx);
      ctx.body = {
        code: 0,
        message: "下架商品成功",
        result: res,
      };
    } catch (error) {
      console.error(error);
      return ctx.app.emit("error", createGoodsError, ctx);
    }
  }
  /**
   * 根据商品id查询是否存在商品
   */
  async isExist(ctx, next) {
    try {
      const res = await getGoodsDetail(ctx.request.body.goods_id);
      if (!res) return ctx.app.emit("error", invalidGoodsId, ctx);
      await next();
    } catch (error) {
      console.error(error);
      return ctx.app.emit("error", getProductDetailError, ctx);
    }
  }
}

module.exports = new GoodsController();
