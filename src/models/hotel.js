/**
 * 酒店模型结构
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const HotelSchema = new Schema({
  title: { type: String },
  address: { type: String },
  phone: { type: String },
  // 开门时间
  open_time: { type: String, default: '08:00' },
  // 关门时间
  end_time: { type: String, default: '22:00' },
  // 酒店所有者ID
  owners_id: { type: [Schema.Types.ObjectId] },
  // 酒店详情
  desc: { type: String },
  // 维度
  latitude: { type: Schema.Types.Number },
  // 经度
  longitude: { type: Schema.Types.Number },
});

export default HotelSchema;
