import { User } from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { secret } from '../../config.json';

const salt = bcrypt.genSaltSync(10);

export default class UserService {
  /**
   * 根据ID查找
   * @param {String} id 用户ID
   */
  async getUserById(id) {
    return await User.findById(id);
  }

  /**
   * 根据邮箱查找
   * @param {String} email 邮箱
   */
  async getUserByEmail(email) {
    return await User.findOne({ email });
  }

  /**
   * 创建新用户
   * @param {User} user 用户信息
   */
  async create(user) {
    // 加密
    let { pass } = user;
    user.pass = bcrypt.hashSync(pass, salt);

    return await User.create(user);
  }

  /**
   * 验证邮箱密码是否匹配
   * @param {String} email 邮箱
   * @param {String} password 密码
   */
  async authPassword(email, password) {
    const user = await this.getUserByEmail(email);
    const compare = bcrypt.compareSync(password, user.pass);
    if (compare) {
      const { _id, email } = user;
      const token = `Bearer ${jwt.sign({ _id, email }, secret, {
        expiresIn: 60 * 60 * 24,
      })}`;
      return { user, token };
    }
    return null;
  }

  /**
   * 设为商家
   * @param {String} id 用户ID
   */
  async changeToBusiness(id) {
    const user = await this.getUserById(id);
    if (user.is_business) {
      throw '您已是商家';
    }
    return await User.findByIdAndUpdate(id, { is_business: true });
  }

  /**
   * 设为非商家
   * @param {String} id 用户ID
   */
  async changeOutBusiness(id) {
    const user = await this.getUserById(id);
    if (!user.is_business) {
      throw '您不是商家';
    }
    return await User.findByIdAndUpdate(id, { is_business: false });
  }
}
