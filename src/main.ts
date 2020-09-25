import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { TransformInterceptor } from './common/transform.interceptor';
import * as path from 'path';

async function bootstrap() {
  let app: INestApplication;
  if (process.env.EHOTEL === 'production') {
    console.log('RUNNING IN 生产环境');
    const fs = require('fs');
    // https
    const httpsOptions = {
      key: fs.readFileSync(path.join(__dirname, '../ssl/2_www.barteam.cn.key')),
      cert: fs.readFileSync(
        path.join(__dirname, '../ssl/1_www.barteam.cn_bundle.crt'),
      ),
    };
    app = await NestFactory.create(AppModule, {
      httpsOptions,
    });
  } else {
    console.log('RUNNING IN 开发环境');
    app = await NestFactory.create(AppModule);
  }

  // 开启跨域
  app.enableCors();
  // 错误请求过滤器 - 封装错误请求
  app.useGlobalFilters(new HttpExceptionFilter());
  // 成功请求拦截器 - 封装成功请求
  app.useGlobalInterceptors(new TransformInterceptor());

  // swagger
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Ehotel API Doc')
    .setDescription('电竞酒店后台API文档')
    .setVersion('2.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(1239);
}
bootstrap();
