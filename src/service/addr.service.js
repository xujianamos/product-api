const Address = require("../model/address.model");
class AddressService {
  // 创建地址
  async createAddr(address) {
    return await Address.create(address);
  }
  // 获取地址
  async getAddr(id) {
    return await Address.findOne({
      where: {
        id,
      },
    });
  }
  // 获取地址列表
  async getAddrList(user_id) {
    return await Address.findAll({
      where: {
        user_id,
      },
    });
  }
  // 更新地址
  async updateAddr(id, address) {
    return await Address.update(address, {
      where: {
        id,
      },
    });
  }
  // 删除地址
  async deleteAddr(id) {
    return await Address.destroy({
      where: {
        id,
      },
    });
  }
  // 设置默认地址
  async setDefaultAddr(user_id, id) {
    await Address.update(
      {
        is_default: false,
      },
      {
        where: {
          user_id,
        },
      }
    );
    return await Address.update(
      {
        is_default: true,
      },
      {
        where: {
          id,
        },
      }
    );
  }
}

module.exports = new AddressService();
