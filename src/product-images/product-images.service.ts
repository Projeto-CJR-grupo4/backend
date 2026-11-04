import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductImagesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductImageDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.product_id },
    });
    if(!product) throw new NotFoundException('Produto não encontrado');

    let order = dto.order;
    if(order === undefined) {
      const last = await this.prisma.productImages.aggregate({
        where: { product_id: dto.product_id },
        _max: { order: true },
      });
      order = (last._max.order ?? -1) + 1;
    }
    return this.prisma.productImages.create({
      data: {
        product_id: dto.product_id,
        image_url: dto.image_url,
        order,
      },
    });
  }

  findAll(productId?: number) {
    return this.prisma.productImages.findMany({
      where: productId != null ? { product_id: productId } : undefined,
      orderBy: [{ product_id: 'asc' }, { order: 'asc' }],
    });
  }

  async findOne(id: number) {
    const image = await this.prisma.productImages.findUnique({
      where: { id },
    });
    if (!image) throw new NotFoundException('Imagem não encontrada')
    return image;
  }

  async update(id: number, dto: UpdateProductImageDto) {
    await this.findOne(id);
    return this.prisma.productImages.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.productImages.delete({ where: { id } });
  }
}
