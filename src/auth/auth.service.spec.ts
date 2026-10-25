import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve gerar um token ao fazer login', async () => {
    const user = {
      id: 3,
      name: 'Teste',
      email: 'teste456@email.com',
    };

    jest
      .spyOn(jwtService, 'signAsync')
      .mockResolvedValue('token-simulado');

    const result = await service.login(user);

    expect(result).toEqual({
      access_token: 'token-simulado',
    });

    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: 3,
      email: 'teste456@email.com',
      name: 'Teste',
    });
  });

  it('deve rejeitar login quando o usuario nao existe', async () => {
    jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);

    await expect(
      service.validateUser('inexistente@email.com', 'Senha@1234'),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('deve rejeitar login quando a senha esta incorreta', async () => {
    const passwordHash = await bcrypt.hash('SenhaCorreta@123', 10);

    const user = {
      id: 3,
      name: 'Teste',
      username: 'teste456',
      email: 'teste456@email.com',
      password_hash: passwordHash,
      profile_picture_url: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);

    await expect(
      service.validateUser('teste456@email.com', 'SenhaErrada@123'),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('deve validar usuario com credenciais corretas', async () => {
    const passwordHash = await bcrypt.hash('SenhaCorreta@123', 10);

    const user = {
      id: 3,
      name: 'Teste',
      username: 'teste456',
      email: 'teste456@email.com',
      password_hash: passwordHash,
      profile_picture_url: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);

    const result = await service.validateUser(
      'teste456@email.com',
      'SenhaCorreta@123',
    );

    expect(result).toEqual({
      id: 3,
      name: 'Teste',
      username: 'teste456',
      email: 'teste456@email.com',
    });
  });
});