/**
 * 酒店模型结构
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const HotelSchema = new Schema({
  title: { type: String },
  address: { type: String },
  phone: { type: String },
  // 房间ID
  rooms_id: { type: [Schema.Types.ObjectId] },
  open_time: { type: String, default: '08:00' },
  end_time: { type: String, default: '22:00' },
  // 酒店所有者ID
  owners_id: { type: [Schema.Types.ObjectId] },
  // 酒店详情
  desc: { type: String },
});

export default HotelSchema;
