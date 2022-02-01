import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthCredentialDto } from './auth.dto';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';
import { AuthEvent } from '@kanban2.0/shared';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ cmd: AuthEvent.register })
  register(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) {
    return this.authService.register(authCredentialDto);
  }

  @MessagePattern({ cmd: AuthEvent.login })
  login(
    @Res() res: Response,
    @Body(ValidationPipe) authCredentialDto: Omit<AuthCredentialDto, 'email'>,
  ): Promise<any> {
    return this.authService.login(authCredentialDto, res);
  }

  @MessagePattern({ cmd: AuthEvent.logout })
  logout(@Res() res: Response) {
    return this.authService.logout(res);
  }

  @MessagePattern({ cmd: AuthEvent.verifyToken })
  verifyToken(token: any) {
    return this.authService.verifyToken(token);
  }

  @MessagePattern({ cmd: AuthEvent.getUserByToken })
  getUserByToken(userId: any) {
    return this.authService.customGetUserById(userId);
  }
}
