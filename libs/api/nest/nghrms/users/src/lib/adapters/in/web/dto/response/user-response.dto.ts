import { ApiProperty } from '@nestjs/swagger';

import { UserAggregate } from '../../../../../domain';

export class UserResponseDto {
  constructor(user: UserAggregate) {
    this.email = user.email.value;
  }

  @ApiProperty({
    example: 'joh-doe@gmail.com',
    description: "User's email address",
  })
  email: string;
}
