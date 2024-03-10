import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../users/dtos/login-dto';
import { RegisterDto } from '../users/dtos/register-dto';
import { AuthGuard } from './jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() userData: LoginDto) {
    return this.authService.login(userData);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() userData: RegisterDto) {
    return this.authService.register(userData);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
