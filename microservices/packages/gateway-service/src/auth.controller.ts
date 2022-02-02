import { AuthEvent, IUser } from '@kanban2.0/shared';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { Authorization } from './decorators/authorization.decorator';
import { GetUser } from './decorators/get-user.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  @Post('/register')
  async register(
    @Res() res: Response,
    @Body() authCredentialDto: IUser & { password: string },
  ) {
    try {
      const registerData = await firstValueFrom(
        this.authService.send({ cmd: AuthEvent.register }, authCredentialDto),
      );

      const { result, cookie } = registerData;
      res.setHeader('Set-Cookie', cookie);
      result.password = undefined;
      return res.send(result);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Post('/login')
  async login(
    @Res() res: Response,
    @Body() authCredentialDto: Omit<IUser, 'email'>,
  ) {
    try {
      const loginData = await firstValueFrom(
        this.authService.send({ cmd: AuthEvent.login }, authCredentialDto),
      );

      const { user, cookie } = loginData;
      res.setHeader('Set-Cookie', cookie);
      user.password = undefined;
      return res.send(user);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    try {
      const loginData = await firstValueFrom(
        this.authService.send({ cmd: AuthEvent.logout }, 'success'),
      );

      const { data, logoutCookie } = loginData;
      res.setHeader('Set-Cookie', logoutCookie);

      return {
        success: data,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Get('/me')
  @Authorization(true)
  me(@GetUser() user: any) {
    return user;
  }
}
