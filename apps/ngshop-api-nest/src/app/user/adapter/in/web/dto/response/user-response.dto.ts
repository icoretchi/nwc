import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  name: string;
  @Expose()
  email: string;
}
