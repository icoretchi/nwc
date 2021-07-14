import { ApiProperty } from '@nestjs/swagger';
import { UserAggregate } from '@nwc/api/nest/ngshop/user/core/domain';

export class UserResponseDto {
  constructor(user: UserAggregate) {
    this.email = user.email.value;
    this.name = user.name.value;
  }

  @ApiProperty({
    example: 'joh-doe@gmail.com',
    description: "User's email address",
  })
  email: string;

  @ApiProperty({
    example: 'name',
    minLength: 2,
    maxLength: 50,
  })
  name: string;
}
