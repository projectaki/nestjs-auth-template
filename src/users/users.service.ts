import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const created = await this.userModel.create(createUserDto);
    return created;
  }

  async update(_id: string, updateUserDto: UpdateUserDto) {
    const updated = await this.userModel.findByIdAndUpdate(_id, updateUserDto, { new: true, upsert: true }).exec();
    return updated;
  }

  async findAll() {
    const res = await this.userModel.find().exec();
    return res;
  }

  async findOne(_id: string, projections: string[] = []) {
    const res = await this.userModel.findById(_id, projections).exec();
    return res;
  }

  async remove(_id: string) {
    const res = await this.userModel.findOneAndDelete({ _id }).exec();
    return res;
  }
}
