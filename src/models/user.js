/**
 * 用户模型结构
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String },
  nickname: { type: String },
  pass: { type: String },
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  avatar_url: { type: String },
  // 是否为店家
  is_business: { type: Boolean, default: false },
  // 是否为vip
  is_vip: { type: Boolean, default: false },
  // 付费余额
  paid_balance: { type: Number, default: 0 },
  // 免费余额
  free_balance: { type: Number, default: 0 },
  // 小程序openid
  openid: { type: String },
  // 身份证号码
  person_id: { type: String, unique: true },
  // 登陆的酒店ID
  login_hotel_id: { type: String },
  token: { type: String },
  // 积分
  integral: { type: Number, default: 0 },
});

export default UserSchema;
