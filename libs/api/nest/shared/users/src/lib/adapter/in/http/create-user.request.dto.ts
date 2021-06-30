import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsEmail, IsString, MaxLength } from 'class-validator';

import { CreateUserInterface } from './create-user.interface';

export class CreateUserRequest implements CreateUserInterface {
  @ApiProperty({ example: 'icoretchi', description: 'User name' })
  @MaxLength(50)
  @IsString()
  @IsAlpha()
  username!: string;

  @ApiProperty({
    example: 'john@gmail.com',
    description: 'User email address',
  })
  @MaxLength(320)
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'ChangeMe!', description: 'Password' })
  @MaxLength(50)
  @IsString()
  password!: string;
}
