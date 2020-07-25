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

  async validate(hotel) {
    let { title, address, phone, open_time, end_time, owners_id, desc } = hotel;

    if (
      !title ||
      !address ||
      !phone ||
      !open_time ||
      !end_time ||
      !owners_id ||
      !desc
    ) {
      throw '请填写完整数据';
    }

    if (owners_id) {
      owners_id = JSON.parse(owners_id);

      for (let i = 0; i < owners_id.length; i++) {
        const user = await userService.getUserById(owners_id[i]);
        if (!user['is_business']) {
          throw `${user['nickname']} 不是商家账号`;
        }
      }
      hotel.owners_id = owners_id;
    }

    return hotel;
  }

  /**
   * 创建酒店
   * @param {object} hotel 酒店信息
   */
  async create(hotel) {
    try {
      const hotelInfo = await this.validate(hotel);
      return await Hotel.create(hotelInfo);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 修改酒店信息
   * @param {String} id id
   * @param {object} hotel 酒店信息
   */
  async update(id, hotel) {
    console.log({ ...hotel });
    try {
      const hotelInfo = await this.validate(hotel);
      return await Hotel.findByIdAndUpdate(id, hotelInfo);
    } catch (error) {
      throw error;
    }
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
