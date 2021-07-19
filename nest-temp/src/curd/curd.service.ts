import { Injectable } from '@nestjs/common';
import { CreateCurdDto } from './dto/create-curd.dto';
import { UpdateCurdDto } from './dto/update-curd.dto';

@Injectable()
export class CurdService {
  create(createCurdDto: CreateCurdDto) {
    return 'This action adds a new curd';
  }

  findAll() {
    return `This action returns all curd`;
  }

  findOne(id: number) {
    return `This action returns a #${id} curd`;
  }

  update(id: number, updateCurdDto: UpdateCurdDto) {
    return `This action updates a #${id} curd`;
  }

  remove(id: number) {
    return `This action removes a #${id} curd`;
  }
}
