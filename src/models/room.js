/**
 * 房间模型结构
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  title: { type: String },
  // 房间号
  room_num: { type: String },
  // 改类的房间总目
  room_count: { type: Number, default: 1 },
  // 最大入住人数
  max_count: { type: Number, default: 0 },
  // 空房间数
  empty_count: { type: Number, default: 1 },
  // 所属酒店ID
  hotel_id: { type: Schema.Types.ObjectId },
  // 旧价格
  old_price: { type: Number, default: 0 },
  // 新价格
  new_price: { type: Number, default: 0 },
  // 房间描述
  desc: { type: String },
  // 房间图片
  img_url: { type: [String] },
  // 房间详情信息
  room_info: { type: String },
  // 电脑配置
  computer_info: { type: String },
});

export default RoomSchema;
