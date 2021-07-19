import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  UseInterceptors,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Cron } from '@nestjs/schedule';
import { CurdService } from './curd.service';
import { CreateCurdDto } from './dto/create-curd.dto';
import { UpdateCurdDto } from './dto/update-curd.dto';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { RolesGuard } from '../common/guards/roles.guard';
import { User } from '../common/decorators/user.decorator';

@Controller('curd')
@ApiTags('CURD')
export class CurdController {
  constructor(private readonly curdService: CurdService) {}
  private readonly logger = new Logger(CurdController.name);

  // @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 45');
  }

  @Get('httperror')
  errorInfo() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      },
      HttpStatus.FORBIDDEN,
    );
  }

  @Get(':number')
  @UseInterceptors(LoggingInterceptor)
  @UseGuards(RolesGuard)
  number(@Param('number', ParseIntPipe) number: number, @User() user: any) {
    console.log('user', user);
    return `number: ${number}, ${typeof number}`;
  }

  @Post()
  create(@Body() createCurdDto: CreateCurdDto) {
    return this.curdService.create(createCurdDto);
  }

  @Get()
  findAll() {
    return this.curdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.curdService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCurdDto: UpdateCurdDto) {
    return this.curdService.update(+id, updateCurdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.curdService.remove(+id);
  }
}
