import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ForbiddenException, Req, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { avatarUploadOptions } from './avatar-upload.config';
import type { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('me')
    getMe(@Req() req: { user: { id: number } }) {
      return this.userService.findOne(req.user.id);
    }

  @Patch('me')
  updateMe(@Req() req: { user: { id: number }}, @Body() dto: UpdateUserDto){
    return this.userService.update(req.user.id, dto);
  }

  @Patch('me/avatar')
  @UseInterceptors(FileInterceptor('file', avatarUploadOptions))
  updateAvatar(
    @Req() req: Request & { user: { id: number } },
    @UploadedFile() file: Express.Multer.File,
  ) {
    if(!file) throw new BadRequestException('Nenhum arquivo enviado.');
    const url = `${req.protocol}://${req.get('host')}/uploads/avatars/${file.filename}`;
    return this.userService.updateAvatar(req.user.id, url);
  }

  @Delete('me')
  removeMe(@Req() req: { user: { id: number } }) {
    return this.userService.remove(req.user.id);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { user: { id: number } },
  ) {
    if (req.user.id !== id) {
      throw new ForbiddenException(
        'Você só pode consultar sua própria conta.',
      );
    }

    return this.userService.findOne(id);
  }

  @IsPublic()
  @Get(':id/public')
  findPublic(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findPublic(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: { user: { id: number } },
  ) {
    if (req.user.id !== id) {
      throw new ForbiddenException(
        'Você só pode alterar sua própria conta',
      );
    }

    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { user: { id: number } },
  ) {
    if (req.user.id !== id) {
      throw new ForbiddenException(
        'Você só pode excluir sua própria conta.',
      );
    }

    return this.userService.remove(id);
  }
}
