import express from 'express';
import bodyParser from 'body-parser';
import {
  userRouter,
  hotelRouter,
  roomRouter,
  recordRouter,
  activeRouter,
  intergalLogRouter,
} from './controllers';
import expressJwt from 'express-jwt';
import { secret, server_port } from '../config.json';
import fs from 'fs';
import path from 'path';
import https from 'https';
import ejs from 'ejs';

const app = express();

// 静态文件目录
app.use('/static', express.static(__dirname + '/upload'));

// ssl 证书配置
const options = {
  pfx: fs.readFileSync(path.join('public', 'www.barteam.cn.pfx')),
  passphrase: 'psyz8c895y8ouz',
};

// body-parser 中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// jwt 中间件
app.use(
  expressJwt({
    secret,
    algorithms: ['HS256'],
    credentialsRequired: true,
  }).unless({
    path: [
      '/',
      '/users/login',
      '/users/register',
      '/users/loginforwx',
      '/hotels/clientget',
      '/hotels/getrooms',
      /\/static*/,
    ],
  })
);

// render page config
app.set('views', path.join('public'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

// 路由
app.get('/', (req, res) => {
  res.render('apidocs.html');
});
app.use('/users', userRouter);
app.use('/hotels', hotelRouter);
app.use('/rooms', roomRouter);
app.use('/records', recordRouter);
app.use('/actives', activeRouter);
app.use('/intergalLogs', intergalLogRouter);

// 404
app.use((req, res) => {
  res.send('404 NOT FOUND');
});

// 创建https服务
// const server = https.createServer(options, app);

// dev
const server = app;

server.listen(server_port, () => {
  console.log(`服务已启动，端口:${server_port}`);
});

export default server;
