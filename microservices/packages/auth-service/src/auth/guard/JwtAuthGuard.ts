import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export default class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const token = req.cookies.token;

    if (!token) {
      return true;
    }
    const { userId }: any = jwt.verify(token, process.env.JWT_SECRET);

    const user = this.hanldeValidate(userId);

    req.user = user;
    return true;
  }

  async hanldeValidate(userId: number) {
    return await this.authService.getUserById(userId);
  }
}
