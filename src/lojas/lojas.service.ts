import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';

@Injectable()
export class LojasService {
  constructor(private prisma: PrismaService) {}
  create(dto: CreateLojaDto) {
    return this.prisma.stores.create({ data: dto });
  }

  findAll() {
    return this.prisma.stores.findMany();
  }

  async findOne(id: number) {
    const loja = await this.prisma.stores.findUnique({ where: { id }, include: { products: true } });
    if (!loja) { throw new NotFoundException(`Loja ${id} não encontrada`);}
    return loja;
  }

  async update(id: number, dto: UpdateLojaDto) {
    await this.findOne(id);
    return this.prisma.stores.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.stores.delete({ where: { id } });
  }
}
