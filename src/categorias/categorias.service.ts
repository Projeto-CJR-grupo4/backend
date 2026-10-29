import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(private prisma: PrismaService) {}
  create(dto: CreateCategoriaDto) {
    return this.prisma.categories.create({ data: dto });
  }

  findAll() {
    return this.prisma.categories.findMany();
  }

  async findOne(id: number) {
    const categoria = await this.prisma.categories.findUnique({ where: { id } });
    if (!categoria) throw new NotFoundException(`Categoria ${id} não encontrada`);
    return categoria;
  }

  async update(id: number, dto: UpdateCategoriaDto) {
    await this.findOne(id);
    return this.prisma.categories.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    const [produtos, lojas, filhas] = await Promise.all([
      this.prisma.product.count({ where: { category_id: id } }),
      this.prisma.stores.count({ where: { category_id: id } }),
      this.prisma.categories.count({ where : { parent_category_id: id } }),
    ]); 
    if (produtos || lojas || filhas) {
      throw new ConflictException('Categoria possui produtos, lojas ou subcategorias vinculadas');
    }
    return this.prisma.categories.delete({ where: { id } });
  }
}
