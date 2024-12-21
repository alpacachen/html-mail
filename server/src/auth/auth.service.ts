import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  async githubAuth(code: string) {
    try {
      // 1. 使用 code 获取 access token
      const tokenResponse = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: this.configService.get('GITHUB_CLIENT_ID'),
          client_secret: this.configService.get('GITHUB_CLIENT_SECRET'),
          code,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      const accessToken = tokenResponse.data.access_token;
      if (!accessToken) {
        throw new Error('Failed to get access token');
      }

      // 2. 使用 access token 获取用户信息
      const userResponse = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return {
        accessToken,
        user: userResponse.data,
      };
    } catch (error) {
      console.error('GitHub auth error:', error);
      throw new Error('GitHub authentication failed');
    }
  }
}
