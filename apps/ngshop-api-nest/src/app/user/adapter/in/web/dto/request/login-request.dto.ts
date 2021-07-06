import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    example: 'email',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Admin123',
    minLength: 6,
    maxLength: 50,
  })
  @IsString()
  password: string;
}
