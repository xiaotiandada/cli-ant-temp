import {
  Controller,
  Get,
  HostParam,
  Ip,
  Redirect,
  Render,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiHeader } from '@nestjs/swagger';
import { AppService } from './app.service';
import { UsersDTO } from './users/dto/users.dto';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';

interface HelloProps {
  code: number;
  message: string;
  doc: string;
  node_env: string;
}

@Controller()
// @Controller({ host: 'localhost' })
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({ type: UsersDTO })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth('access-token')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  getHello(@Ip() ip: string, @HostParam() hosts: string): HelloProps {
    console.log('ip', ip);
    console.log('hosts', hosts);
    return {
      code: 0,
      message: this.appService.getHello(),
      doc: '/openapi',
      node_env: process.env.NODE_ENV,
    };
  }

  @Get('ab*cd')
  findAll() {
    return 'This route uses a wildcard';
  }

  @Get('hbs')
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }

  @Get('redirect')
  @Redirect('https://docs.nestjs.com/controllers', 301)
  redirect() {
    return { url: 'https://docs.nestjs.com/v5/' };
  }
}
