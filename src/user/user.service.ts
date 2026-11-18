import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);

    try {
      return await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          username: createUserDto.username,
          email: createUserDto.email,
          password_hash: passwordHash,
          profile_picture_url: createUserDto.profilePictureUrl,
        },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          profile_picture_url: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
  return this.prisma.user.findMany({
    select: {
      id: true,
      name: true,
      username: true,
    },
  });
}

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        profile_picture_url: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async findPublic(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        profile_picture_url: true,
        createdAt: true,
      },
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: {
          id: id,
        },

        data: {
          name: updateUserDto.name,
          username: updateUserDto.username,
          email: updateUserDto.email,
          profile_picture_url: updateUserDto.profilePictureUrl,
        },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          profile_picture_url: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Username ou email já está em uso.');
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.user.delete({
        where: {
          id: id,
        },

        select: {
          id: true,
          name: true,
          username: true,
          email: true,
        },
      });
    } catch (error) {

      throw error;
    }
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
  findByIdForAuth(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  updateAvatar(id: number, url: string) {
    return this.prisma.user.update({
      where: { id },
      data: { profile_picture_url: url },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        profile_picture_url: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async changePassword(id: number, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { password_hash: true },
    });
    if(!user) throw new NotFoundException('Usuário não encontrado.');

    const confere = await bcrypt.compare(dto.oldPassword, user.password_hash);
    if(!confere) throw new BadRequestException('Senha antiga incorreta.');

    if (dto.oldPassword === dto.newPassword) {
      throw new BadRequestException('A nova senha deve ser diferente da antiga.');
    }

    const novoHash = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.user.update({
      where: { id },
      data: { password_hash: novoHash },
    });

    return { message: 'Senha alterada com sucesso.' };
  }
}