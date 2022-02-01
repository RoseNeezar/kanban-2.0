import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get<string[]>(
      'secured',
      context.getHandler(),
    );
    console.log('canActivate---', secured);
    if (!secured) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    console.log('auth-header', request);
    // const userTokenInfo = await firstValueFrom(
    //   this.tokenServiceClient.send('token_decode', {
    //     token: request.headers.authorization,
    //   }),
    // );

    // if (!userTokenInfo || !userTokenInfo.data) {
    //   throw new HttpException(
    //     {
    //       message: userTokenInfo.message,
    //       data: null,
    //       errors: null,
    //     },
    //     userTokenInfo.status,
    //   );
    // }

    // const userInfo = await firstValueFrom(
    //   this.userServiceClient.send('user_get_by_id', userTokenInfo.data.userId),
    // );

    // request.user = userInfo.user;
    return true;
  }
}
