import UserService from '../service/user.service';
import express from 'express';
const router = express.Router();

const userService = new UserService();

/**
 * 根据邮箱获取用户信息
 * @route GET /users/:email
 * @param {String} email
 */
router.get('/:email', async (req, res) => {
  const { email } = req.params;
  const user = await userService.getUserByEmail(email);
  res.json({
    code: 0,
    data: user,
  });
});

/**
 * 注册
 * @route POST /users/register
 * @param {string} nickname
 * @param {string} pass
 * @param {string} email
 */
router.post('/register', async (req, res) => {
  const { nickname, pass, email } = req.body;
  await userService.createSimpleUser({ nickname, pass, email });

  res.json({
    code: 0,
    message: 'SUCCESS',
  });
});

/**
 * 邮箱密码登陆
 * @route POST /users/login
 * @param {string} email
 * @param {string} pass
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

export default router;
