import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}
  async create(dto: CreateUserDto) {
    dto.password = await bcrypt.hash(dto.password, 10);
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  async findByCond(data: any) {
    return await this.repository.find({ where: data });
  }
  // async findOne(email:string,password:string) {
  //   const users: Array<User> = await this.repository.find({where:{email:}});
  //
  //   if (!users.length) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }
  //   return users;
  // }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
