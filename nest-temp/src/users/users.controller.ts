import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Patch,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import {
  ApiQuery,
  ApiBody,
  ApiHeader,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UsersDTO } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('Users')
  @Post()
  @ApiBody({ type: UsersDTO })
  @HttpCode(201)
  async createUsers(@Body() data: UsersDTO) {
    const user = await this.usersService.create(data);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      user,
    };
  }

  @ApiTags('Users')
  @Patch(':id')
  @ApiBody({ type: UsersDTO })
  @HttpCode(200)
  async uppdateUser(@Param('id') id: number, @Body() data: Partial<UsersDTO>) {
    await this.usersService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
    };
  }

  @ApiTags('Users')
  @Get(':id')
  @HttpCode(200)
  async readUser(@Param('id') id: number) {
    const data = await this.usersService.read(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data,
    };
  }

  @ApiTags('Users')
  @Get(':email/email')
  @HttpCode(200)
  async findByEmailUser(@Param('email') email: string) {
    const data = await this.usersService.findByEmail(email);
    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data,
    };
  }

  @ApiTags('Users')
  @Get()
  @HttpCode(200)
  async showAllUsers() {
    const users = await this.usersService.showAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      users,
    };
  }

  @ApiTags('Users')
  @Delete(':id')
  @HttpCode(200)
  async deleteUser(@Param('id') id: number) {
    await this.usersService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }
}
