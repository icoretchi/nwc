import { ApiProperty } from '@nestjs/swagger';

export class SignUpRequestDto {
  @ApiProperty({
    example: 'name',
    minLength: 2,
    maxLength: 50,
  })
  name: string;

  @ApiProperty({
    example: 'Admin123',
    minLength: 6,
    maxLength: 50,
  })
  password: string;

  @ApiProperty({
    example: 'email@gmail.com',
  })
  email: string;
}
