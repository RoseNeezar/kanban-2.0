import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GetUser } from './decorators/get-user.decorator';
import { IUser, AuthEvent } from '@kanban2.0/shared';
import { Authorization } from './decorators/authorization.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  @Post('/register')
  register(@Body() authCredentialDto: IUser) {
    return this.authService.send(
      { cmd: AuthEvent.register },
      authCredentialDto,
    );
  }

  @Post('/login')
  login(@Res() res: Response, @Body() authCredentialDto: Omit<IUser, 'email'>) {
    return this.authService.send(
      { cmd: AuthEvent.login },
      { authCredentialDto, res },
    );
  }

  @Post('/logout')
  logout(@Res() res: Response) {
    return this.authService.send({ cmd: AuthEvent.logout }, res);
  }

  @Get('/me')
  @Authorization(true)
  me(@GetUser() user: any) {
    return user;
  }
}
