import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MongooseUserDocument = MongooseUser & Document;

@Schema()
export class MongooseUser {
  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    default: false,
  })
  isEmailVerified: boolean;

  @Prop({
    default: false,
  })
  isAdminUser: boolean;

  @Prop({
    default: false,
  })
  isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(MongooseUser);

UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

UserSchema.set('toJSON', {
  virtuals: true,
});
