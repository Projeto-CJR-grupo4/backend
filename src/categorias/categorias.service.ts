import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(private prisma: PrismaService) {}
  create(dto: CreateCategoriaDto) {
    return this.prisma.categoria.create({ data: dto });
  }

  findAll() {
    return this.prisma.categoria.findMany();
  }

  async findOne(id: number) {
    const categoria = await this.prisma.categoria.findUnique({ where: { id } });
    if (!categoria) throw new NotFoundException(`Categoria ${id} não encontrada`);
    return categoria;
  }

  async update(id: number, dto: UpdateCategoriaDto) {
    await this.findOne(id);
    return this.prisma.categoria.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    const produtos = await this.prisma.produto.count({ where: { categoriaId: id } });
    if (produtos > 0) throw new ConflictException(`Categoria possui produtos vinculados`);
    return this.prisma.categoria.delete({ where: { id } });
  }
}
