import { Room } from '../models';

export default class RoomService {
  /**
   * 获取某酒店的全部房间
   * @param {String} hotelId 房间所属的酒店ID
   */
  async getAllRoom(hotelId) {
    return await Room.find({ hotel_id: hotelId });
  }

  /**
   * 根据Id查找房价
   * @param {String} id Room Id
   */
  async getRoomById(id) {
    return Room.findById(id);
  }

  /**
   * 校验并完善数据
   * @param {object} room 房间信息
   */
  validateAndFix(room) {
    let {
      title,
      room_num,
      room_count,
      max_count,
      empty_count,
      hotel_id,
      new_price,
      img_url,
    } = room;

    if (
      !title ||
      !room_num ||
      !room_count ||
      !max_count ||
      !empty_count ||
      !hotel_id ||
      !new_price
    ) {
      throw '请填写完整数据';
    }

    if (room_count < 1) {
      throw '至少有一间该类的房间';
    }

    if (max_count < 1) {
      throw '该类的房间至少能住一个人';
    }

    room.old_price = new_price;

    if (img_url) {
      img_url = JSON.parse(img_url);
      if (img_url.length > 0) {
        room.img_url = img_url;
      }
    }

    return room;
  }

  /**
   * 创建房间
   * @param {object} room 房间信息
   */
  async create(room) {
    try {
      const roomInfo = this.validateAndFix(room);
      return await Room.create(roomInfo);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 修改房间信息
   * @param {String} id Room ID
   * @param {object} room 房间信息
   */
  async update(id, room) {
    try {
      const roomInfo = this.validateAndFix(room);
      return await Room.findByIdAndUpdate(id, roomInfo);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 删除房间
   * @param {String} id Room ID
   */
  async remove(id) {
    const room = this.findById(id);
    if (room === null) {
      throw '未找到要删除的房间';
    }
    return await Room.findByIdAndDelete(id);
  }
}
