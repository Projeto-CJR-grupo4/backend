import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}
  create(dto: CreateProdutoDto) {
    return this.prisma.product.create({ data: dto });
  }

  findAll() {
    return this.prisma.product.findMany({ include: { store: true, category: true } });
  }

  async findOne(id: number) {
    const produto = await this.prisma.product.findUnique({ where: { id } });
    if (!produto) { throw new NotFoundException(`Produto ${id} não encontrado`); }
    return produto;
  }
 
  async update(id: number, dto: UpdateProdutoDto) {
    await this.findOne(id);
    return this.prisma.product.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.product.delete({ where: { id } });
  }
}
