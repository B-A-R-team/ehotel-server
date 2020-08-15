import { Hotel } from '../models';
import UserService from './user.service';
import fs from 'fs';
import path from 'path';

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
      owners_id = JSON.parse(JSON.stringify(owners_id));

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
   * 获取该酒店的轮播图
   * @param {String} id 酒店ID
   */
  async getSwiperList(id) {
    const hotel = await this.getHotelById(id);
    const { swiperList } = hotel;
    if (swiperList.length > 0) {
      return swiperList;
    } else {
      return null;
    }
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
    try {
      const hotelInfo = await this.validate(hotel);
      return await Hotel.findByIdAndUpdate(id, hotelInfo);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 添加轮播图路径到数据库
   * @param {String} id 酒店ID
   * @param {String} swiperUrl 轮播图路径
   */
  async addSwiper(id, swiperUrl) {
    try {
      let hotel = await Hotel.findById(id);
      const { swiperList } = hotel;

      if (!swiperList) {
        hotel['swiperList'] = [swiperUrl];
      } else {
        hotel['swiperList'] = [...swiperList, swiperUrl];
      }

      return await this.update(id, hotel);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 更新轮播图信息
   * @param {String} id 酒店ID
   * @param {String[]} swiperUrlList 轮播图路径
   */
  async updateSwiper(id, swiperUrlList) {
    try {
      let hotel = await Hotel.findById(id);

      if (swiperUrlList instanceof Object) {
        hotel['swiperList'] = swiperUrlList;
      } else {
        hotel['swiperList'] = JSON.parse(swiperUrlList);
      }

      return await this.update(id, hotel);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 上传文件
   * @param {String} filename 文件名
   * @param {File} file 文件
   * @param {Function} callback
   */
  upload(filename, file, callback) {
    const newFilename = new Date().getTime() + path.extname(filename);
    const file_path = path.join(__dirname, '../upload/' + newFilename);
    const file_url = 'static/' + newFilename;

    file.on('end', function () {
      callback({
        url: file_url,
      });
    });

    file.pipe(fs.createWriteStream(file_path));
  }

  /**
   * 注销店面
   * @param {String} id 酒店ID
   */
  async removeById(id) {
    return Hotel.findByIdAndDelete(id);
  }

  // TODO 是否应该增加员工  可能需要修改模型
}
