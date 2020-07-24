/**
 * 住房记录模型结构
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  // 酒店id
  hotel_id: { type: Schema.Types.ObjectId, required: true },
  // 房间id
  room_id: { type: Schema.Types.ObjectId, required: true },
  // 入住登记者id
  guest_id: { type: Schema.Types.ObjectId, required: true },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  // 记录是否失效
  is_close: { type: Boolean, default: false },
  // 入住人员信息
  member_message: { type: String, required: true },
  // 备注
  remarks: { type: String },
  // 参加的活动ID
  active_id: { type: String },
});

export default RecordSchema;
