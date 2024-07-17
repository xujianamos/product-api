const path = require("path");
const {
  uploadFileError,
  unSupportedFileType,
} = require("../constant/err.type");
class GoodsController {
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
  async create(ctx, next) {
    ctx.body = "创建商品";
  }
}

module.exports = new GoodsController();
