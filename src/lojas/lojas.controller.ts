import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, Req } from '@nestjs/common';
import { LojasService } from './lojas.service';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@Controller('lojas')
export class LojasController {
  constructor(private readonly lojasService: LojasService) { }

  @Post()
  create(
    @Body() dto: CreateLojaDto,
    @Req() req: { user: { id: number } },
  ) {
    return this.lojasService.create(dto, req.user.id);
  }

  @IsPublic()
  @Get()
  findAll(@Query('userId') userId?: string) {
    return this.lojasService.findAll(userId ? Number(userId) : undefined);
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lojasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLojaDto,
    @Req() req: { user: { id: number } },
  ) {
    return this.lojasService.update(id, dto, req.user.id);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { user: { id: number } },
  ) {
    return this.lojasService.remove(id, req.user.id);
  }
}
