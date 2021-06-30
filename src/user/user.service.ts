import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginTypeEnum, UserRepository } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (e) {
      throw new HttpException(
        {
          message: e.name + ' : ' + e.detail,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (e) {
      throw new HttpException(
        {
          message: e.name + ' : ' + e.detail,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(email: string, login_type: LoginTypeEnum) {
    try {
      const result = await this.userRepository.findOne({ email, login_type });
      if (!result) throw { name: 'NOT FOUND', detail: `${email}` };
      return result;
    } catch (e) {
      throw new HttpException(
        {
          message: e.name + ' : ' + e.detail,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  update(email: string, updateUserDto: UpdateUserDto) {
    return `This action u user`;
  }

  async remove(email: string) {
    return await this.userRepository.softDelete(email);
  }
}
