import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserMetadata {
  @Prop({ default: false })
  darkMode: boolean;
}

export const UserMetadataSchema = SchemaFactory.createForClass(UserMetadata);
