import { Controller, Get } from '@nestjs/common';

@Controller()
export class UsersController {
  @Get('users')
  getProfile() {
    return 'users test';
  }
}
