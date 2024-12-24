import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello() {
    return { message: 'hello email' };
  }

  @UseGuards(AuthGuard)
  @Post('send-email')
  async sendEmail(
    @Body('email') email: string,
    @Body('content') content: string,
  ) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Invalid email format');
    }

    if (!content) {
      throw new BadRequestException('Content is required');
    }

    return await this.appService.sendTestEmail(email, content);
  }
}
