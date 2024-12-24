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
    @Body('subject') subject: string,
  ) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    if (!subject) {
      throw new BadRequestException('Subject is required');
    }
    return await this.appService.sendTestEmail(email, content, subject);
  }

  @UseGuards(AuthGuard)
  @Post('send-email-custom')
  async sendEmailCustom(
    @Body('email') email: string,
    @Body('content') content: string,
    @Body('subject') subject: string,
    @Body('config')
    config: {
      host: string;
      port: number;
      user: string;
      pass: string;
    },
  ) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    if (!subject) {
      throw new BadRequestException('Subject is required');
    }
    if (!config) {
      throw new BadRequestException('Email configuration is required');
    }
    if (!config.host || !config.port || !config.user || !config.pass) {
      throw new BadRequestException('Invalid email configuration');
    }

    return await this.appService.sendCustomEmail(
      email,
      content,
      subject,
      config,
    );
  }
}
