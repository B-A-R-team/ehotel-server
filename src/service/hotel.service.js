import { Hotel } from '../models';
import UserService from './user.service';

const userService = new UserService();
export default class HotelService {
  /**
   * 根据酒店名查找
   * @param {String} title 酒店名
   */
  async getHotelByTitle(title) {
    return await Hotel.findOne({ title });
  }

  /**
   * 根据ID查找
   * @param {String} id 酒店ID
   */
  async getHotelById(id) {
    return await Hotel.findById(id);
  }

  /**
   * 创建酒店
   * @param {object} hotel 酒店信息
   */
  async create(hotel) {
    let { owners_id } = hotel;

    // 转为数组
    owners_id = JSON.parse(owners_id);
    if (owners_id.length === 0) {
      throw '店主不能为空';
    }
    for (let i = 0; i < owners_id.length; i++) {
      const user = await userService.getUserById(owners_id[i]);
      if (!user['is_business']) {
        throw `${user['nickname']} 不是商家账号`;
      }
    }
    // 将转为数组的店主id存入数据
    hotel.owners_id = owners_id;
    return await Hotel.create(hotel);
  }

  /**
   * 修改酒店信息
   * @param {String} id id
   * @param {object} hotel 酒店信息
   */
  async update(id, hotel) {
    let { owners_id } = hotel;

    // 转为数组
    owners_id = JSON.parse(owners_id);
    if (owners_id.length === 0) {
      throw '店主不能为空';
    }
    for (let i = 0; i < owners_id.length; i++) {
      const user = await userService.getUserById(owners_id[i]);
      if (!user['is_business']) {
        throw `${user['nickname']} 不是商家账号`;
      }
    }
    // 将转为数组的店主id存入数据
    hotel.owners_id = owners_id;
    return await Hotel.findByIdAndUpdate(id, hotel);
  }

  /**
   * 注销店面
   * @param {String} id 酒店ID
   */
  async removeById(id) {
    return Hotel.findByIdAndDelete(id);
  }

  // @todo 是否应该增加员工  可能需要修改模型
}
