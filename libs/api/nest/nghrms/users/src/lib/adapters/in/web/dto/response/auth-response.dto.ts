import { ApiProperty } from '@nestjs/swagger';

import { UserAggregate } from '../../../../../domain';

export class AuthResponseDto {
  constructor(auth: { user: UserAggregate; token: string }) {
    this.email = auth.user.email.value;
    this.token = auth.token;
  }

  @ApiProperty({
    example: 'joh-doe@gmail.com',
    description: "User's email address",
  })
  email: string;

  @ApiProperty()
  token: string;
}
