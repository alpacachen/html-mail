import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('github')
  async githubAuth(@Body('code') code: string) {
    if (!code) {
      throw new Error('Authorization code is required');
    }
    return await this.authService.githubAuth(code);
  }

  @Post('gitee')
  async giteeAuth(@Body('code') code: string) {
    if (!code) {
      throw new Error('Authorization code is required');
    }
    return await this.authService.giteeAuth(code);
  }
}
