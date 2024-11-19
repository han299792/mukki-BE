import { Controller, Get, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessTokenResponse } from './dto/auth.type';
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/kakao-login')
  async kakaoRedirect(@Res() res): Promise<void> {
    const url = await this.authService.generateAuthUrl();
    res.redirect(url);
  }
  @Get('/kakao')
  async getAccessToken(
    @Query('code') code: string,
  ): Promise<AccessTokenResponse> {
    console.log(code);
    if (!code) {
      console.log('Authorization code missing');
      throw new Error('Authorization code is required');
    }
    const tokenRes = await this.authService.getAccessToken(code);
    return tokenRes;
  }
}
