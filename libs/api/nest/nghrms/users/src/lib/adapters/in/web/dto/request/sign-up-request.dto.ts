import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpRequestDto {
  @ApiProperty({
    example: 'email@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Admin123',
    minLength: 6,
    maxLength: 50,
  })
  @IsNotEmpty()
  password: string;
}
