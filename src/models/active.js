/**
 * 活动信息模型
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ActiveSchema = new Schema({
  // 主题/活动名称
  topic: { type: String, required: true },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  start_time: { type: Date, default: Date.now },
  end_time: { type: Date, required: true },
  // 活动详情
  detail: { type: String },
  // 活动简介
  desc: { type: String },
  hotel_id: { type: Schema.Types.ObjectId, required: true },
});

export default ActiveSchema;
