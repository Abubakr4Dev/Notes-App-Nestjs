import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../users/dtos/login-dto';
import { RegisterDto } from '../users/dtos/register-dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() userData: LoginDto) {
    return this.authService.login(userData);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() userData: RegisterDto) {
    return this.authService.register(userData);
  }
}
