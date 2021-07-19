import { Module } from '@nestjs/common';
import { CurdService } from './curd.service';
import { CurdController } from './curd.controller';

@Module({
  controllers: [CurdController],
  providers: [CurdService]
})
export class CurdModule {}
