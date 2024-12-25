import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { GithubUser, GiteeUser, JwtPayload, OAuthUser } from './types';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async githubAuth(code: string) {
    try {
      const accessToken = await this.getGithubAccessToken(code);
      const user = await this.getGithubUser(accessToken);
      return this.createAuthResponse(user);
    } catch (error) {
      console.error('GitHub auth error:', error);
      throw new UnauthorizedException('GitHub authentication failed');
    }
  }

  async giteeAuth(code: string) {
    try {
      const accessToken = await this.getGiteeAccessToken(code);
      const user = await this.getGiteeUser(accessToken);
      return this.createAuthResponse(user);
    } catch (error) {
      console.error('Gitee auth error:', error);
      throw new UnauthorizedException('Gitee authentication failed');
    }
  }

  private async getGithubAccessToken(code: string): Promise<string> {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: this.configService.get('GIT_OAUTH_CLIENT_ID'),
        client_secret: this.configService.get('GIT_OAUTH_CLIENT_SECRET'),
        code,
      },
      {
        headers: { Accept: 'application/json' },
      },
    );

    const accessToken = response.data.access_token;
    if (!accessToken) {
      throw new Error('Failed to get GitHub access token');
    }
    return accessToken;
  }

  private async getGiteeAccessToken(code: string): Promise<string> {
    const response = await axios.post(
      'https://gitee.com/oauth/token',
      {
        grant_type: 'authorization_code',
        code,
        client_id: this.configService.get('GITEE_OAUTH_CLIENT_ID'),
        client_secret: this.configService.get('GITEE_OAUTH_CLIENT_SECRET'),
        redirect_uri: this.configService.get('GITEE_OAUTH_REDIRECT_URI'),
      },
      {
        headers: { Accept: 'application/json' },
      },
    );

    const accessToken = response.data.access_token;
    if (!accessToken) {
      throw new Error('Failed to get Gitee access token');
    }
    return accessToken;
  }

  private async getGithubUser(accessToken: string): Promise<GithubUser> {
    const response = await axios.get<GithubUser>(
      'https://api.github.com/user',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return response.data;
  }

  private async getGiteeUser(accessToken: string): Promise<GiteeUser> {
    const response = await axios.get<GiteeUser>(
      'https://gitee.com/api/v5/user',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return response.data;
  }

  private async createAuthResponse(user: OAuthUser) {
    const token = await this.generateToken(user);
    return {
      token,
      user: {
        id: user.id,
        login: user.login,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatar_url,
      },
    };
  }

  private async generateToken(user: OAuthUser) {
    const payload: JwtPayload = {
      sub: user.id,
      username: user.login,
      email: user.email,
    };
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string) {
    try {
      return await this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
