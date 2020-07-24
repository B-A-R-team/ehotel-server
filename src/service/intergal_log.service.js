import { IntergalLog } from '../models';

export default class IntergalLogService {
  /**
   * get intergal log by id
   * @param {String} id log id
   */
  async getIntergalLogById(id) {
    return await IntergalLog.findById(id);
  }

  /**
   * get intergal log by user id
   * @param {String} userId user id
   */
  async getIntergalLogByUserId(userId) {
    return await IntergalLog.find({ user_id: userId });
  }

  /**
   * create a new interal log
   * @param {object} intergalLog intergal log info
   */
  async create(intergalLog) {
    const { user_id, sell_count } = intergalLog;
    if (!user_id || !sell_count) {
      throw '请按要求填写数据';
    }
    return await IntergalLog.create(intergalLog);
  }

  /**
   * update intergal log
   * @param {string} id log id
   * @param {object} intergalLog updated intergalLog data
   */
  async update(id, intergalLog) {
    if (this.getIntergalLogById(id)) {
      const { user_id, sell_count } = intergalLog;
      if (!user_id || !sell_count) {
        throw '请按要求填写数据';
      }
      return await IntergalLog.findByIdAndUpdate(id, intergalLog);
    } else {
      throw '未找到该记录';
    }
  }

  /**
   * 删除记录
   * @param {string} id log id
   */
  async remove(id) {
    if (this.getIntergalLogById(id)) {
      return await IntergalLog.findByIdAndDelete(id);
    } else {
      throw '未找到该记录';
    }
  }
}
