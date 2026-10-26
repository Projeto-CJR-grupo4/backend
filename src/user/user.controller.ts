import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, ForbiddenException, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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
