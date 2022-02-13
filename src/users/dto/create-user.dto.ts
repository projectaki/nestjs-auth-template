import { UserMetadata } from '../entities/user-metadata.entity';

export class CreateUserDto {
  _id: string;
  name: string;
  email: string;
  user_metadata?: UserMetadata;
}
