import { ApiProperty } from '@nestjs/swagger';

export class UsersDTO {
  id: number;

  @ApiProperty({
    required: true,
    description: 'name',
    example: 'xiaotian',
  })
  username: string;
  @ApiProperty({
    required: true,
    description: 'email',
    example: 'qq@qq.com',
  })
  email: string;

  @ApiProperty({
    required: true,
    description: 'password',
    example: '123456',
  })
  password: string;
}
