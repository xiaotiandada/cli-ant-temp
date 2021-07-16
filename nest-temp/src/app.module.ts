import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoticeService } from './notice/notice.service';
import { NoticeController } from './notice/notice.controller';
import { NoticeModule } from './notice/notice.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import config from './config/index';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'xiaotian',
      database: 'nest-temp',
      entities: [User],
      synchronize: true,
    }),
    NoticeModule,
    UsersModule,
  ],
  controllers: [AppController, NoticeController],
  providers: [AppService, NoticeService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
