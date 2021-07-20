import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as session from 'express-session';
import * as csurf from 'csurf';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  console.log('NODE_ENV', process.env.NODE_ENV);

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Nest Doc')
    .setDescription('nestjs doc')
    .setVersion('1.0')
    .addTag('Doc')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('openapi', app, document);

  app.use(cookieParser());
  // app.use(compression());
  // app.use(csurf());
  app.use(helmet());

  // https://docs.nestjs.com/techniques/session
  // app.use(
  //   session({
  //     secret: 'my-secret',
  //     resave: false,
  //     saveUninitialized: false,
  //   }),
  // );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  app.enableCors();

  await app.listen(7980);
}
bootstrap();
