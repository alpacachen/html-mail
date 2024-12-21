import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AppService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // 创建邮件传输器，这里使用 QQ 邮箱作为示例
    this.transporter = nodemailer.createTransport({
      host: 'smtp.qq.com',
      port: 465,
      secure: true,
      auth: {
        user: '302681871@qq.com',
        pass: 'iersghbgmpdcbhac', // 在QQ邮箱设置中获取授权码
      },
    });
  }

  getHello(): string {
    return 'Hello World!';
  }

  getTest(testid: string) {
    return parseInt(testid) + 1;
  }

  async sendTestEmail(email: string) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: '302681871@qq.com', // 发件人
      to: email, // 收件人
      subject: 'Test Email', // 邮件主题
      html: '<p>This is a test email from NestJS application <b>Hello</b></p>', // 邮件内容
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return { message: 'Email sent successfully', info };
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}
