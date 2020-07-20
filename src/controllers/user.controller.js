import UserService from '../service/user.service';
import express from 'express';
const router = express.Router();

const userService = new UserService();

/**
 * 根据邮箱获取用户信息
 * @route GET /users/:email
 * @param {String} email.params
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
 * @param {string} nickname.body
 * @param {string} pass.body
 * @param {string} email.body
 */
router.post('/register', async (req, res) => {
  const { nickname, pass, email } = req.body;
  await userService.create({ nickname, pass, email });

  res.json({
    code: 0,
    message: 'SUCCESS',
  });
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
