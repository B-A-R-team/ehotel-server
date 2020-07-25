import { User } from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { secret } from '../../config.json';

const salt = bcrypt.genSaltSync(10);

export default class UserService {
  /**
   * 分页获取用户
   * @param {number} page 请求页码
   * @param {number} size 数据量
   */
  async getUserByPage(page, size) {
    let userList = await User.find()
      .skip(--page * size)
      .limit(size);

    const total = await User.countDocuments();
    return { userList, total };
  }
  /**
   * 根据ID查找
   * @param {String} id 用户ID
   */
  async getUserById(id) {
    const user = await User.findById(id);
    if (!user) {
      throw '未找到该用户';
    }
    return user;
  }

  /**
   * 根据邮箱查找
   * @param {String} email 邮箱
   */
  async getUserByEmail(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw '未找到该用户';
    }
    return user;
  }

  /**
   * 创建新用户
   * @param {User} user 用户信息
   */
  async create(user) {
    // 加密
    let { pass, email } = user;

    if (User.findOne({ email })) {
      throw '该邮箱已注册';
    }

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
