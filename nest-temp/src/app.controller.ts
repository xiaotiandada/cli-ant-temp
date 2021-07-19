import { Controller, Get, HostParam, Ip, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

interface HelloProps {
  code: number;
  message: string;
  doc: string;
  node_env: string;
}

@Controller()
// @Controller({ host: 'localhost' })
export class AppController {
  constructor(private readonly appService: AppService) {}

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

  @Get('redirect')
  @Redirect('https://docs.nestjs.com/controllers', 301)
  redirect() {
    return { url: 'https://docs.nestjs.com/v5/' };
  }
}
