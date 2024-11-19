import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccessTokenResponse } from './dto/auth.type';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class AuthService {
  private readonly kakaoAuthUrl: string;
  private readonly clientId: string;
  private readonly redirectUri: string;
  private readonly userInfoUrl: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.kakaoAuthUrl = this.configService.get<string>('KAKAO_AUTH_URL');
    this.clientId = this.configService.get<string>('KAKAO_APP_KEY');
    this.redirectUri = this.configService.get<string>('KAKAO_REDIRECT_URI');
    this.userInfoUrl = this.configService.get<string>('KAKAO_USER_INFO');
    if (!this.kakaoAuthUrl || !this.clientId || !this.redirectUri) {
      throw new Error('Missing required Kakao environment variables');
    }
  }

  async generateAuthUrl(
    responseType: string = 'code',
    scope?: string,
  ): Promise<string> {
    let url = `${this.kakaoAuthUrl}?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=${responseType}&prompt=select_account`;
    if (scope) {
      url += `&scope=${scope}`;
    }
    return url;
  }

  async getAccessToken(code: string): Promise<AccessTokenResponse> {
    if (!code) {
      throw new Error('Authorization code is required');
    }

    const url = this.configService.get<string>('KAKAO_TOKEN_URL');
    const config = {
      grant_type: 'authorization_code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      code,
    };
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    const res = await firstValueFrom(
      this.httpService.post(url, config, { headers }),
    );
    return res.data;
  }

  async getUserInfoFromToken(accessToken: string): Promise<number> {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.userInfoUrl, { headers }),
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user info from Kakao');
    }
  }
}
