const GoodsErrorType = require("./goods.type");

const CartErrorType = require("./cart.type");
const UserErrorType = require("./user.type");
const OrderErrorType = require("./order.type");

module.exports = {
  ...GoodsErrorType,
  ...CartErrorType,
  ...UserErrorType,
  ...OrderErrorType,
  userFormateError: {
    code: "10001",
    message: "用户名或密码为空",
    result: "",
  },
  userAlreadyExited: {
    code: "10002",
    message: "用户已经存在",
    result: "",
  },
  userRegisterError: {
    code: "10003",
    message: "用户注册错误",
    result: "",
  },
  userDoesNotExist: {
    code: "10004",
    message: "用户不存在",
    result: "",
  },
  userLoginError: {
    code: "10005",
    message: "用户登录失败",
    result: "",
  },
  invalidPassword: {
    code: "10006",
    message: "密码错误",
    result: "",
  },
  tokenExpiredError: {
    code: "10101",
    message: "token过期",
    result: "",
  },
  invalidToken: {
    code: "10102",
    message: "无效的token",
  },
  hasNotAdminPermission: {
    code: "10103",
    message: "没有管理员权限",
    result: "",
  },
  uploadFileError: {
    code: "10201",
    message: "商品图片上传失败",
    result: "",
  },
  unSupportedFileType: {
    code: "10202",
    message: "不支持图片文件格式",
    result: "",
  },
  goodsFormatError: {
    code: "10203",
    message: "商品参数格式错误",
    result: "",
  },
  getProductDetailError: {
    code: "10204",
    message: "获取商品详情失败",
    result: "",
  },
  createGoodsError: {
    code: "10205",
    message: "创建商品失败",
    result: "",
  },
  updateGoodsError: {
    code: "10206",
    message: "更新商品失败",
    result: "",
  },
  invalidGoodsId: {
    code: "10207",
    message: "无效的商品ID",
    result: "",
  },
  deleteGoodsError: {
    code: "10208",
    message: "删除商品失败",
    result: "",
  },
  // 获取商品列表失败
  getGoodsListError: {
    code: "10209",
    message: "获取商品列表失败",
    result: "",
  },
  // 缺少分页参数
  invalidParams: {
    code: "10210",
    message: "缺少分页参数",
    result: "",
  },
  //   服务器出错
  serverError: {
    code: "500",
    message: "服务器出错",
    result: "",
  },
};
