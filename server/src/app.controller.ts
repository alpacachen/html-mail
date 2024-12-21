import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('send-email')
  async sendEmail(
    @Body('email') email: string,
    @Body('content') content: string,
  ) {
    if (!email) {
      throw new Error('Email is required');
    }
    return await this.appService.sendTestEmail(email, content);
  }
}
