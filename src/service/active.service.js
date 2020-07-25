import { Active } from '../models';

export default class ActiveService {
  /**
   * 根据id找活动
   * @param {String} id active id
   */
  async getActiveById(id) {
    return await Active.findById(id);
  }

  /**
   * get actives by hotel id
   * @param {String} hotelId hotel id
   */
  async getActiveByHotelId(hotelId) {
    return await Active.find({ hotel_id: hotelId });
  }

  /**
   * 验证数据
   * @param {object} active active info
   */
  validate(active) {
    const { topic, end_time, hotel_id, desc } = active;

    if (!topic || !end_time || !hotel_id || !desc) {
      throw '请填写必要数据';
    }

    return active;
  }

  /**
   * 创建活动
   * @param {object} active 活动信息
   */
  async create(active) {
    try {
      const activeInfo = this.validate(active);
      return await Active.create(activeInfo);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 更新活动信息
   * @param {String} id active id
   * @param {object} active active info
   */
  async update(id, active) {
    try {
      if (this.getActiveById(id)) {
        let activeInfo = this.validate(active);
        active.update_at = Date.now();
        return await Active.findByIdAndUpdate(id, activeInfo);
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * 删除活动信息
   * @param {string} id active id
   */
  async remove(id) {
    if (this.getActiveById(id)) {
      return await Active.findByIdAndDelete(id);
    } else {
      throw '未找到该活动';
    }
  }
}
