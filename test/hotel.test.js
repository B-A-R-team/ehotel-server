import app from '../src/app';
import supertest from 'supertest';
import assert from 'assert';
import { secret } from '../config.json';
import jwt from 'jsonwebtoken';

const request = supertest(app);

describe('test/hotel.test.js', function () {
  let self = {};

  // 初始化所需数据
  beforeEach(() => {
    self['hotelId'] = '5f15898e9e625204e0c20b29';
    self['wrong_hotelId'] = '5f15898e9e625204e0c20b11';
    self['user'] = {
      email: '123456@email.com',
      pass: '123456',
      id: '5f1bca7af36ef83b7c46b63f',
    };
    self['token'] = `Bearer ${jwt.sign(
      {
        _id: self['user']['id'],
        email: self['user']['email'],
      },
      secret,
      {
        expiresIn: 60 * 60 * 24,
      }
    )}`;
  });

  // 根据酒店ID获取酒店信息
  it('should get hotel info when GET /hotels/clientget with hotel id', function (done) {
    request
      .get('/hotels/clientget')
      .query({ id: self['hotelId'] })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        const result = res.body;
        assert.equal(result['code'], 0);
        done();
      });
  });

  // 未传入酒店ID
  it('code should be 2 when GET /hotels/clientget without hotel id', function (done) {
    request
      .get('/hotels/clientget')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        const result = res.body;
        assert.equal(result['code'], 2);
        done();
      });
  });

  // 获取某个酒店的全部房间信息
  it('should get rooms info when GET /hotels/getrooms with hotel id', function (done) {
    request
      .get('/hotels/getrooms')
      .query({ id: self['hotelId'] })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        const result = res.body;
        assert.equal(result['code'], 0);
        done();
      });
  });

  // 获取房间信息时 未传酒店ID
  it('code should be 2 when GET /hotels/getrooms without hotel id', function (done) {
    request
      .get('/hotels/getrooms')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        const result = res.body;
        assert.equal(result['code'], 2);
        done();
      });
  });

  // 获取房间信息时 传入不存在的/格式错误的酒店ID
  it('code should be 1 and data should be null when GET /hotels/getrooms with a wrong id', function (done) {
    request
      .get('/hotels/getrooms')
      .query({
        id: self['wrong_hotelId'],
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        const result = res.body;
        assert.equal(result['code'], 1);
        done();
      });
  });

  // 修改轮播图
  it('code should be 0 when PUT /hotels/swiper/update with id and swiperList', function (done) {
    request
      .put('/hotels/swiper/update')
      .set('Authorization', self['token'])
      .send({
        id: self['hotelId'],
        swiperUrlList: ['static/1597464405743.jpg', 'static/1597464006411.png'],
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        const result = res.body;
        assert.equal(result['code'], 0);
        done();
      });
  });
});
