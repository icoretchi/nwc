import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserEntity & Document;

@Schema({ autoCreate: true, timestamps: true, autoIndex: true })
export class UserEntity {
  @Prop({ immutable: true, required: true, type: String, index: true })
  readonly id!: string;

  @Prop({ required: true, index: true, type: String })
  email!: string;

  @Prop({ required: true })
  passwordHash!: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);

UserSchema.set('toJSON', {
  virtuals: true,
});
