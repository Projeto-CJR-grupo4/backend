import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const loginDto = plainToInstance(
      LoginDto,
      request.body ?? {},
    );

    const errors = validateSync(loginDto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      throw new BadRequestException(
        errors.flatMap((error) =>
          Object.values(error.constraints ?? {}),
        ),
      );
    }

    return super.canActivate(context);
  }
}