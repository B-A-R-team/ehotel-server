/**
 * 积分记录模型结构
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const IntergalLogSchema = new Schema({
  user_id: { type: String, required: true },
  // 是否为消耗
  is_out: { type: Boolean, default: false },
  // 交易的积分数量
  sell_count: { type: Number, required: true },
  // 备注
  remarks: { type: String },
});

export default IntergalLogSchema;
