import { UserService } from '../service';
import express from 'express';
import fetch from 'node-fetch';
import { appsecret, appid } from '../../config.json';
const router = express.Router();

const userService = new UserService();

/**
 * 分页获取用户
 * @route GET /users/list?page=1&size=5
 * @param {number} page.query
 * @param {number} size.query
 */
router.get('/list', async (req, res) => {
  const { page = 1, size = 5 } = req.query;
  try {
    const users = await userService.getUserByPage(
      parseInt(page),
      parseInt(size)
    );
    res.json({ code: 0, data: users });
  } catch (error) {
    res.json({ code: 1, message: error });
  }
});

/**
 * 根据id获取用户信息
 * @route GET /users/list/:id
 * @param {String} id.params
 */
router.get('/list/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    res.json({ code: 0, data: user });
  } catch (error) {
    res.json({ code: 1, message: error });
  }
});

/**
 * 注册
 * @route POST /users/register
 * @param {string} nickname.body
 * @param {string} pass.body
 * @param {string} email.body
 */
router.post('/register', async (req, res) => {
  const { nickname, pass, email } = req.body;
  try {
    await userService.create({ nickname, pass, email });

    res.json({ code: 0, message: 'SUCCESS' });
  } catch (error) {
    res.json({ code: 1, message: error });
  }
});

/**
 * 邮箱密码登陆
 * @route POST /users/login
 * @param {string} email.body
 * @param {string} pass.body
 */
router.post('/login', async (req, res) => {
  const { email, pass } = req.body;
  const loginInfo = await userService.authPassword(email, pass);

  if (loginInfo === null) {
    return res.json({
      code: 1,
      message: '账号或密码错误',
    });
  }

  res.json({
    code: 0,
    data: loginInfo,
  });
});

/**
 * 微信小程序授权登录
 * @route POST /users/loginforwx
 * @param {string} nickname
 * @param {string} avatar_url
 * @param {string} code
 */
router.post('/loginforwx', async (req, res) => {
  const { nickname, avatar_url, code } = req.body;
  console.log(nickname, avatar_url, code);

  const response = await fetch(
    `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`
  );
  const result = await response.json();
  const { openid, session_key } = result;

  const token = await userService.getToken(openid, session_key);

  let user = await userService.getUserByOpenid(openid);
  // 如果用户不存在，创建账户
  if (user === null) {
    user = await userService.createForWX(nickname, avatar_url, openid);
  }

  res.json({
    code: 0,
    user,
    token,
  });
});

/**
 * 成为商家
 * @route PUT /users/tobusiness
 * @param {String} id.body
 */
router.put('/tobusiness', async (req, res) => {
  const { id } = req.body;
  try {
    await userService.changeToBusiness(id);
    res.json({
      code: 0,
      message: 'SUCCESS',
    });
  } catch (error) {
    res.json({
      code: 1,
      message: error,
    });
  }
});

/**
 * 退出商家
 * @route PUT /users/outbusiness
 * @param {String} id.body
 */
router.put('/outbusiness', async (req, res) => {
  const { id } = req.body;
  try {
    await userService.changeOutBusiness(id);
    res.json({
      code: 0,
      message: 'SUCCESS',
    });
  } catch (error) {
    res.json({
      code: 1,
      message: error,
    });
  }
});

export default router;
