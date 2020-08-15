import supertest from 'supertest';
import app from '../src/app';

const request = supertest(app);

describe('test/app.test.js', function () {
  it('should visit api docs page', function (done) {
    request.get('/').expect(200, done);
  });
});

// 关闭测试连接
after(function () {
  process.exit();
});
