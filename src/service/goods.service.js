const Goods = require("../model/goods.model");

class GoodService {
  /**
   * 创建商品
   * @param {} goods
   * @returns
   */
  async createGoods(goods) {
    const res = await Goods.create(goods);
    return res.dataValues;
  }
  /**
   * 获取商品列表
   * @param {*} pageNum
   * @param {*} pageSize
   * @returns
   */
  async getGoodsList(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize;
    const limit = parseInt(pageSize);
    const res = await Goods.findAndCountAll({
      offset,
      limit,
      order: [["createdAt"]],
    });
    return {
      pageNum,
      pageSize,
      total: res.count,
      list: res.rows.map((row) => row.dataValues),
    };
  }
  /**
   * 获取商品详情
   * @param {*} id
   * @returns
   */
  async getGoodsDetail(id) {
    const res = await Goods.findOne({
      where: {
        id,
      },
    });
    return res.dataValues;
  }
  /**
   * 更新商品
   * @param {*} id
   * @param {*} goods
   * @returns
   */
  async updateGoods(id, goods) {
    const res = await Goods.update(goods, {
      where: {
        id,
      },
    });
    return res[0] > 0 ? true : false;
  }
  /**
   * 删除商品
   * @param {*} id
   * @returns
   */
  async removeGoods(id) {
    const res = await Goods.destroy({
      where: {
        id,
      },
    });
    return res > 0 ? true : false;
  }
  // 批量删除商品
  async removeGoodsByIds(ids) {
    const res = await Goods.destroy({
      where: {
        id: ids,
      },
    });
    return res > 0 ? true : false;
  }
  // 上架商品
  async restoreGoods(id) {
    const res = await Goods.restore({
      where: {
        id,
      },
    });
    return res > 0 ? true : false;
  }
  /**
   * 根据分类id获取商品
   * @param {*} categoryId
   * @returns
   */
  async getGoodsByCategoryId(categoryId) {
    const res = await Goods.findAll({
      where: {
        categoryId,
      },
    });
    return res;
  }
  /**
   * 根据分类id和商品名获取商品
   * @param {*} categoryId
   * @param {*} goodsName
   * @returns
   */
  async getGoodsByCategoryIdAndGoodsName(categoryId, goodsName) {
    const res = await Goods.findAll({
      where: {
        categoryId,
        goodsName: goodsName,
      },
    });
    return res;
  }
  /**
   * 根据商品名获取商品(模糊搜索)
   * @param {*} goodsName
   * @returns
   */
  async getGoodsByGoodsName(goodsName) {
    const res = await Goods.findAll({
      where: {
        goods_name: goodsName,
      },
    });
    return res;
  }
}
module.exports = new GoodService();
