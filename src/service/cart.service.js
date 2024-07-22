const { Op } = require("sequelize");
const Cart = require("../model/cart.model");
const Goods = require("../model/goods.model");
class CartsService {
  /**
   * 创建或更新购物车
   * @param {*} user_id
   * @param {*} goods_id
   */
  async createOrUpdateCart(user_id, goods_id) {
    let res = await Cart.findOne({
      where: {
        [Op.and]: {
          user_id,
          goods_id,
        },
      },
    });
    if (res) {
      res.increment("number");
      await res.reload();
      return res;
    } else {
      return await Cart.create({
        user_id,
        goods_id,
        number: 1,
      });
    }
  }
  /**
   * 获取购物车列表
   * @param {*} pageNum
   * @param {*} pageSize
   * @returns
   */
  async findAll(pageNum, pageSize) {
    const { count, rows } = await Cart.findAndCountAll({
      attributes: ["id", "number", "selected"],
      offset: (pageNum - 1) * pageSize,
      limit: pageSize * 1,
      include: {
        model: Goods,
        as: "goods_info",
        attributes: ["id", "goods_name", "goods_price", "goods_img"],
      },
    });
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows.map((row) => row.dataValues),
    };
  }
  /**
   * 更新购物车
   */
  async updateCart(params = {}) {
    console.log("params", params);
    const { id, number, selected } = params;
    const res = await Cart.findByPk(id);
    if (!res) return "";
    number !== undefined ? (res.number = number) : "";
    selected !== undefined ? (res.selected = selected) : "";
    // number !== undefined && res.increment("number", { by: number });
    // selected !== undefined && res.update({ selected });
    return await res.save();
  }
  /**
   * 批量删除购物车数据
   */
  async removeCarts(ids) {
    return await Cart.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  }
  /**
   * 全选中
   */
  async selectAllCarts(user_id) {
    return await Cart.update(
      {
        selected: true,
      },
      {
        where: {
          user_id,
        },
      }
    );
  }
  /**
   * 全不选中
   */
  async unSelectAllCarts(user_id) {
    return await Cart.update(
      {
        selected: false,
      },
      {
        where: {
          user_id,
        },
      }
    );
  }
}

module.exports = new CartsService();
