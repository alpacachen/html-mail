import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  getTest(@Query('testid') testid: string) {
    if (!testid) {
      throw new Error('testid is required');
    }
    return this.appService.getTest(testid);
  }

  @Post('send-email')
  async sendEmail(@Body('email') email: string) {
    if (!email) {
      throw new Error('Email is required');
    }
    return await this.appService.sendTestEmail(email);
  }
}
