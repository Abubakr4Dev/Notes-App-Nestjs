import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { RegisterDto } from './dtos/register-dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // async login(userData: LoginDto): Promise<User> {
  //   const user = await this.userModel.findOne({ email: userData.email });
  //   if (!user) {
  //     throw new HttpException('Email Not Found', HttpStatus.NOT_FOUND);
  //   }

  //   const isPasswordValid = await bcrypt.compare(
  //     userData.password,
  //     user.password,
  //   );
  //   if (!isPasswordValid) {
  //     throw new HttpException('Invalid Password', HttpStatus.UNAUTHORIZED);
  //   }

  //   return user;
  // }

  async create(userData: RegisterDto) {
    const user = await this.userModel.findOne({ email: userData.email });
    if (user) {
      throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
    }

    const newUser = new this.userModel(userData);
    return await newUser.save();
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }
}
