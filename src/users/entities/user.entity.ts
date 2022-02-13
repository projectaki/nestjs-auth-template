import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserMetadata } from './user-metadata.entity';

export type UserDocument = User & Document;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
})
export class User {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: UserMetadata, default: () => ({}), _id: false })
  user_metadata?: UserMetadata;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
