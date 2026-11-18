import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';

@Injectable()
export class LojasService {
  constructor(private prisma: PrismaService) { }
  create(dto: CreateLojaDto, usuarioId: number) {
    return this.prisma.stores.create({
      data: {
        ...dto,
        user_id: usuarioId,
      },
    });
  }

  findAll(userId?: number) {
    return this.prisma.stores.findMany({
      where: { user_id: userId },
      include: { category: { select: { id: true, name: true } } },
    });
  }

  async findOne(id: number) {
    const loja = await this.prisma.stores.findUnique({ where: { id }, include: { products: true, category: { select: { name: true } }, user: { select: { id: true, name: true } } } });
    if (!loja) { throw new NotFoundException(`Loja ${id} não encontrada`); }
    return loja;
  }

  private async buscarDono(id: number, usuarioId: number) {
    const loja = await this.findOne(id);
    if (loja.user_id !== usuarioId) { throw new ForbiddenException(`Só o dono pode alterar`); }
    return loja;
  }

  async update(id: number, dto: UpdateLojaDto, usuarioId: number) {
    await this.buscarDono(id, usuarioId);
    return this.prisma.stores.update({ where: { id }, data: dto });
  }

  async remove(id: number, usuarioId: number) {
    await this.buscarDono(id, usuarioId);
    return this.prisma.stores.delete({ where: { id } });
  }
}
