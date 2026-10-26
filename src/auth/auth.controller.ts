import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IsPublic } from './decorators/is-public.decorator';

type AuthenticatedRequest = {
  user: {
    id: number;
    name: string;
    email: string;
  };
};

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Req() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }

  @Get('auth/profile')
  getProfile(@Req() req: AuthenticatedRequest) {
    return req.user;
  }
}