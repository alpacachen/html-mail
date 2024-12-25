import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { GithubUser, GiteeUser, JwtPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async githubAuth(code: string) {
    try {
      // 1. 获取 access token

      const tokenResponse = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: this.configService.get('GIT_OAUTH_CLIENT_ID'),
          client_secret: this.configService.get('GIT_OAUTH_CLIENT_SECRET'),
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

      const userResponse = await axios.get<GithubUser>(
        'https://api.github.com/user',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const user = userResponse.data;

      // 3. 生成 JWT token
      const jwtToken = await this.generateToken(user);

      return {
        token: jwtToken,
        user: {
          id: user.id,
          login: user.login,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatar_url,
        },
      };
    } catch (error) {
      console.error('GitHub auth error:', error);
      throw new Error('GitHub authentication failed');
    }
  }

  private async generateToken(user: GithubUser) {
    const payload: JwtPayload = {
      sub: user.id,
      username: user.login,
      email: user.email,
    };

    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token);
      return payload;
    } catch {
      throw new Error('Invalid token');
    }
  }

  async giteeAuth(code: string) {
    try {
      // 1. 获取 access token
      const tokenResponse = await axios.post(
        'https://gitee.com/oauth/token',
        {
          grant_type: 'authorization_code',
          code,
          client_id: this.configService.get('GITEE_OAUTH_CLIENT_ID'),
          client_secret: this.configService.get('GITEE_OAUTH_CLIENT_SECRET'),
          redirect_uri: this.configService.get('GITEE_OAUTH_REDIRECT_URI'),
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

      // 2. 获取用户信息
      const userResponse = await axios.get<GiteeUser>(
        'https://gitee.com/api/v5/user',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const user = userResponse.data;

      // 3. 生成 JWT token
      const jwtToken = await this.generateToken({
        id: user.id,
        login: user.login,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
      });

      return {
        token: jwtToken,
        user: {
          id: user.id,
          login: user.login,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatar_url,
        },
      };
    } catch (error) {
      console.error('Gitee auth error:', error);
      throw new Error('Gitee authentication failed');
    }
  }
}
