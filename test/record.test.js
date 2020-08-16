import app from '../src/app';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import assert from 'assert';
import { secret } from '../config.json';

const request = supertest(app);

describe('test/record.test.js', function () {
  let self = {};

  // 初始化测试数据
  beforeEach(() => {
    self['recordInfo'] = {
      hotel_id: '5f15898e9e625204e0c20b29',
      room_id: '5f16c6ad93042c5b14d9304d',
      guest_id: '5f1bca7af36ef83b7c46b63f',
      member_message: {
        name: '徐梦宇',
        phone: '1591591591',
      },
      remarks: '无',
      status: '待付款',
      coupon: 0,
      price: 100,
    };
    self['recordId'] = '5f1c0eb90fc0ae559842b047';
    self['hotelId'] = '5f15898e9e625204e0c20b29';
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

  // 根据id获取record info
  it('code should be 0 when GET /records/getbyId with id', function (done) {
    request
      .get('/records/getbyId')
      .set('Authorization', self['token'])
      .query({
        id: self['recordId'],
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        const result = res.body;
        assert.equal(result['code'], 0);
        done();
      });
  });

  // 根据hotelId/roomId/guestId获取record info
  it('code should be 0 when GET /records/getby with hotelId/roomId/guestId', function (done) {
    request
      .get('/records/getbyId')
      .set('Authorization', self['token'])
      .query({
        id: self['hotelId'],
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        const result = res.body;
        assert.equal(result['code'], 0);
        done();
      });
  });

  // 创建新的record
  it('code should be 0 when POST /records/create with a complete record info', function (done) {
    request
      .post('/records/create')
      .set('Authorization', self['token'])
      .send({ ...self['recordInfo'] })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        const result = res.body;
        self['newRecordId'] = result['data']['_id'];
        assert.equal(result['code'], 0);
        done();
      });
  });

  // 修改record
  it('code should be 0 when POST /records/update/:id with a new record info', function (done) {
    request
      .put(`/records/update/${self['recordId']}`)
      .set('Authorization', self['token'])
      .send({ ...self['recordInfo'], status: '已完成' })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        const result = res.body;
        assert.equal(result['code'], 0);
        done();
      });
  });

  // 设置为无效记录
  it('code should be 0 when PUT /records/setclose/:id with a record id', function (done) {
    request
      .put(`/records/setclose/${self['recordId']}`)
      .set('Authorization', self['token'])
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        const result = res.body;
        assert.equal(result['code'], 0);
        done();
      });
  });

  // 设置为有效记录
  it('code should be 0 when PUT /records/setopen/:id with a record id', function (done) {
    request
      .put(`/records/setopen/${self['recordId']}`)
      .set('Authorization', self['token'])
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        const result = res.body;
        assert.equal(result['code'], 0);
        done();
      });
  });

  // 删除记录ID
  it('code should be 0 when DELETE /records/delete/:id with a record id', function (done) {
    request
      .delete(`/records/delete/${self['newRecordId']}`)
      .set('Authorization', self['token'])
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        const result = res.body;
        assert.equal(result['code'], 0);
        done();
      });
  });
});
