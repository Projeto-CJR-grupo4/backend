import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

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
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'E-mail ou nome de usuário já cadastrado.',
        );
      }

      throw error;
    }
  }

  async findAll() {
    return await this.prisma.user.findMany({
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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Usuário não encontrado.');
        }

        if (error.code === 'P2002') {
          throw new ConflictException(
            'E-mail ou nome de usuário já cadastrado.',
          );
        }
      }

      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
}