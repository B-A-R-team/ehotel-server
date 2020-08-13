import app from '../../src/app';
import supertest from 'supertest';
import assert from 'assert';

const request = supertest(app);

describe('test/controllers/hotel.test.js', function () {
  let hotelId = '';

  // 初始化所需数据
  beforeEach(() => {
    hotelId = '5f15898e9e625204e0c20b29';
  });

  // 根据酒店ID获取酒店信息
  it('should get hotel info when GET /hotels/clientget with hotel id', (done) => {
    request
      .get('/hotels/clientget')
      .query({ id: hotelId })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        const result = res.body;
        assert.equal(result['code'], 0);
        done();
      });
  });

  // 未传入酒店ID
  it('code should be 2 when GET /hotels/clientget without hotel id', (done) => {
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
});
