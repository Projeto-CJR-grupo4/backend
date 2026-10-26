import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ForbiddenException, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';

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
