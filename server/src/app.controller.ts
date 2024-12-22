import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard)
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
