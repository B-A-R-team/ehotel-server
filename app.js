import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './src/controllers/user.controller';
import expressJwt from 'express-jwt';
import { secret } from './config.json';

const app = express();

// body-parser 中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// jwt 中间件
app.use(
  expressJwt({
    secret,
    algorithms: ['HS256'],
    credentialsRequired: false,
  }).unless({
    path: ['/users/login', '/users/register'],
  })
);

// 路由
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.send('Hotel System API');
});

app.listen(1234, () => {
  console.log('server running http://localhost:1234');
});
