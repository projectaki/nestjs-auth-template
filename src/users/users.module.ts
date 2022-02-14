import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), LoggerModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
