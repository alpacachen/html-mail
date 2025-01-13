import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

interface EmailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
}

@Injectable()
export class AppService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: true,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendTestEmail(to: string, content: string, subject: string) {
    try {
      const mailOptions = {
        from: this.configService.get<string>('SMTP_USER'),
        to,
        subject: subject,
        html: content,
      };

      const result = await this.transporter.sendMail(mailOptions);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  async sendCustomEmail(
    email: string,
    content: string,
    subject: string,
    config: EmailConfig,
  ) {
    try {
      // 创建临时 transporter
      const customTransporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: true,
        auth: {
          user: config.user,
          pass: config.pass,
        },
      });

      // 验证配置是否正确
      await customTransporter.verify().catch((err) => {
        throw new BadRequestException(`邮箱配置验证失败: ${err.message}`);
      });

      const mailOptions = {
        from: config.user,
        to: email,
        subject: subject,
        html: content,
      };

      const result = await customTransporter.sendMail(mailOptions);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}
