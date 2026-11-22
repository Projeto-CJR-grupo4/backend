import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, Req, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import type { Request } from 'express';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { MAX_IMAGENS_POR_ENVIO, productImagesUploadOptions } from './product-images-upload.config';

type RequisicaoAutenticada = Request & { user: { id: number } };

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) { }

  @Post()
  create(@Body() dto: CreateProdutoDto, @Req() req: RequisicaoAutenticada) {
    return this.produtosService.create(dto, req.user.id);
  }

  @IsPublic()
  @Get()
  findAll(@Query('storeId') storeId?: string, @Query('userId') userId?: string,) {
    return this.produtosService.findAll({
      storeId: storeId ? Number(storeId) : undefined,
      userId: userId ? Number(userId) : undefined,
    });
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.produtosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProdutoDto, @Req() req: RequisicaoAutenticada) {
    return this.produtosService.update(id, dto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: RequisicaoAutenticada) {
    return this.produtosService.remove(id, req.user.id);
  }

  @Post(':id/imagens')
  @UseInterceptors(FilesInterceptor('files', MAX_IMAGENS_POR_ENVIO, productImagesUploadOptions))
  addImages(@Param('id', ParseIntPipe) id: number, @UploadedFiles() files: Express.Multer.File[], @Req() req: RequisicaoAutenticada) {
    if (!files?.length) throw new BadRequestException('Nenhuma imagem enviada');
    const base = `${req.protocol}://${req.get('host')}/uploads/produtos`;
    const urls = files.map((file) => `${base}/${file.filename}`);
    return this.produtosService.addImages(id, urls, req.user.id);
  }

  @Delete(':id/imagens/:imagemId')
  removeImage(@Param('id', ParseIntPipe) id: number, @Param('imagemId', ParseIntPipe) imagemId: number, @Req() req: RequisicaoAutenticada) {
    return this.produtosService.removeImage(id, imagemId, req.user.id);
  }
}
