import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../users/dtos/login-dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../users/dtos/register-dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userPayload: LoginDto) {
    const user = await this.userService.findUserByEmail(userPayload.email);

    if (!user) {
      throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(
      userPayload.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('ivalid password', HttpStatus.UNAUTHORIZED);
    }

    const payload = { sub: user._id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(userData: RegisterDto) {
    const user = await this.userService.create(userData);
    const payload = { sub: user._id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
    };
  }
  
}
