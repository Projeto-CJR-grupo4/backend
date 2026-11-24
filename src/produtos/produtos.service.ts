import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) { }

  private async garantirDono(storeId: number, userId: number) {
    const loja = await this.prisma.stores.findUnique({ where: { id: storeId } });
    if (!loja) throw new NotFoundException(`Loja ${storeId} não encontrada`);
    if (loja.user_id !== userId) throw new ForbiddenException('Só o dono pode gerenciar os produtos');
  }

  async create(dto: CreateProdutoDto, userId: number) {
    await this.garantirDono(dto.store_id, userId);
    return this.prisma.product.create({ data: dto });
  }

  findAll(filters: { storeId?: number; userId?: number }) {
    return this.prisma.product.findMany({
      where: {
        store_id: filters.storeId,
        store: filters.userId ? { user_id: filters.userId } : undefined,
      },
      include: {
        images: { orderBy: { order: 'asc' } },
        store: { select: { id: true, name: true, logo_url: true } },
        category: true,
        productRatings: { select: { rating: true } }
      },
    });
  }

  async findOne(id: number) {
    const produto = await this.prisma.product.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { order: 'asc' }
        },
        store: {
          select: {
            id: true,
            name: true,
            logo_url: true,
            user_id: true,
            category_id: true
          }
        },
        category: true,
        productRatings: {
          select: {
            rating: true
          }
        }
      }
    });

    if (!produto) {
      throw new NotFoundException(`Produto ${id} não encontrado`);
    }

    return produto;
  }

  async update(id: number, dto: UpdateProdutoDto, userId: number) {
    const product = await this.findOne(id);
    await this.garantirDono(product.store_id, userId);
    if (dto.store_id !== undefined) await this.garantirDono(dto.store_id, userId);
    return this.prisma.product.update({ where: { id }, data: dto });
  }

  async remove(id: number, userId: number) {
    const product = await this.findOne(id);
    await this.garantirDono(product.store_id, userId);
    return this.prisma.product.delete({ where: { id } });
  }

  async addImages(id: number, urls: string[], userId: number) {
    const product = await this.findOne(id);
    await this.garantirDono(product.store_id, userId);
    const last = await this.prisma.productImages.aggregate({
      where: { product_id: id },
      _max: { order: true },
    });
    let ordem = (last._max.order ?? -1) + 1;

    await this.prisma.productImages.createMany({
      data: urls.map((url) => ({ product_id: id, image_url: url, order: ordem++ })),
    });

    return this.prisma.productImages.findMany({
      where: { product_id: id },
      orderBy: { order: 'asc' },
    });
  }

  async removeImage(id: number, imageId: number, userId: number) {
    const product = await this.findOne(id);
    await this.garantirDono(product.store_id, userId);

    const image = await this.prisma.productImages.findFirst({
      where: { id: imageId, product_id: id },
    });
    if (!image) throw new NotFoundException(`Imagem ${imageId} não encontrada`);

    return this.prisma.productImages.delete({ where: { id: imageId } });
  }
}
