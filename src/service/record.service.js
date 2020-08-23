import { Record } from '../models';
import { RoomService } from '.';

// const roomService = new RoomService();

export default class RecordService {
  /**
   * 根据id找记录
   * @param {string} id record id
   */
  async getRecordById(id) {
    const roomService = new RoomService();
    const record = await Record.findById(id);
    const room = await roomService.getRoomById(record['room_id']);

    return {
      title: room['title'],
      id: record['_id'],
      status: record['status'],
      time: record['create_at'],
      member: record['member_message'],
      discount: record['coupon'],
      price: record['price'],
    };
  }

  /**
   * get by hotel id
   * @param {string} hotelId hotel id
   */
  async getRecordByHotelId(hotelId) {
    return await Record.find({ hotel_id: hotelId });
  }

  /**
   * get by room id
   * @param {string} roomId room id
   */
  async getRecordByRoomId(roomId) {
    return await Record.findOne({ room_id: roomId });
  }

  /**
   * get by guest's id
   * @param {string} guestId guest id
   */
  async getRecordByGuestId(guestId) {
    const roomService = new RoomService();
    const recordList = await Record.find({ guest_id: guestId }).sort({
      _id: -1,
    });

    let recordData = [];

    for (let i = 0; i < recordList.length; i++) {
      const room = await roomService.getRoomById(recordList[i]['room_id']);

      recordData.push({
        title: room['title'],
        id: recordList[i]['_id'],
        status: recordList[i]['status'],
        time: recordList[i]['create_at'],
        member: recordList[i]['member_message'],
        discount: recordList[i]['coupon'],
        price: recordList[i]['price'],
      });
    }

    return recordData;
  }

  /**
   * 校验数据
   * @param {object} record 记录信息
   */
  validate(record) {
    let { hotel_id, room_id, guest_id, member_message } = record;

    if (!hotel_id || !room_id || !guest_id) {
      throw '请确定酒店id，房间id以及入住用户id';
    }

    if (member_message) {
      record['member_message'] = JSON.stringify(member_message);
    }

    return record;
  }

  /**
   * 创建新记录
   * @param {object} record 记录信息
   */
  async create(record) {
    try {
      const recordInfo = this.validate(record);
      return await Record.create(recordInfo);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 修改记录信息
   * @param {String} id record id
   * @param {object} record record message
   */
  async update(id, record) {
    try {
      if (await this.getRecordById(id)) {
        let recordInfo = this.validate(record);
        recordInfo.update_at = Date.now();
        return await Record.findByIdAndUpdate(id, recordInfo);
      } else {
        throw '未找到该记录';
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * find by id and close this record
   * @param {string} id record id
   */
  async setClose(id) {
    try {
      if (await this.getRecordById(id)) {
        return await Record.findByIdAndUpdate(id, {
          is_close: true,
          update_at: Date.now(),
        });
      } else {
        throw '未找到该记录';
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * find by id and open this record
   * @param {string} id record id
   */
  async setOpen(id) {
    try {
      if (await this.getRecordById(id)) {
        return await Record.findByIdAndUpdate(id, {
          is_close: false,
          update_at: Date.now(),
        });
      } else {
        throw '未找到该记录';
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * 根据id删除
   * @param {String} id
   */
  async removeById(id) {
    try {
      return await Record.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
