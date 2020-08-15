import app from '../src/app';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import assert from 'assert';
import { secret } from '../config.json';

const request = supertest(app);

describe('test/user.test.js', function () {
  let self = {};

  // 初始化测试数据
  beforeEach(() => {
    self['user'] = {
      email: '123456@email.com',
      pass: '123456',
    };
    self['id'] = '5f1bca7af36ef83b7c46b63f';
    self['token'] = `Bearer ${jwt.sign(
      {
        _id: self['id'],
        email: self['user']['email'],
      },
      secret,
      { expiresIn: 60 * 60 * 24 }
    )}`;
  });

  // 登陆
  it('code should be 0 when POST /users/login with correct email and pass', function (done) {
    request
      .post('/users/login')
      .send({
        ...self['user'],
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        const result = res.body;
        assert.equal(result['code'], 0);
        done();
      });
  });

  // 错误的账号/密码
  it('code should be 1 when POST /users/login with wrong email or pass', function (done) {
    request
      .post('/users/login')
      .send({
        email: self['user']['email'],
        pass: '111111',
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        const result = res.body;
        assert.equal(result['code'], 1);
        done();
      });
  });

  // 成为商家  如果已经是商家账号则code会为1
  it("code should be 0 when PUT /users/tobusiness with user's id", function (done) {
    request
      .put('/users/tobusiness')
      .set('Authorization', self['token'])
      .send({ id: self['id'] })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        const result = res.body;
        assert.equal(result['code'], 0);
        done();
      });
  });

  // 成为商家 id不存在/格式不对
  it('message should not be "您已是商家" when PUT /users/tobusiness with a wrong user\'s id', function (done) {
    request
      .put('/users/tobusiness')
      .set('Authorization', self['token'])
      .send({ id: '123456789' })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        const result = res.body;
        assert.equal(result['code'], 1);
        assert.notEqual(result['message'], '您已是商家');
        done();
      });
  });

  // 成为普通用户  如果本身不是商家账号则code为1
  it("code should be 0 when PUT /users/outbusiness with user's id", function (done) {
    request
      .put('/users/outbusiness')
      .set('Authorization', self['token'])
      .send({ id: self['id'] })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        const result = res.body;
        assert.equal(result['code'], 0);
        done();
      });
  });
});
