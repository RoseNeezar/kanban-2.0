import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReturnModelType } from '@typegoose/typegoose';
import * as bcrypt from 'bcryptjs';
import * as cookie from 'cookie';
import { Response } from 'express';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'src/models/user.model';
import { AuthCredentialDto, TokenPayload } from './auth.dto';
import * as jwt from 'jsonwebtoken';
import { IUser } from '@kanban2.0/shared';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userRepo: ReturnModelType<typeof User>,
    private jwtService: JwtService,
  ) {}

  async register(authCredentialDto: IUser & { password: string }) {
    const { email, password, username } = authCredentialDto;

    const emailUser = await this.userRepo.findOne({ email });
    const usernameUser = await this.userRepo.findOne({ username });

    if (emailUser) {
      throw new ConflictException('Email already exists');
    }
    if (usernameUser) {
      throw new ConflictException('Username already exists');
    }

    try {
      const user: Partial<User> = {
        username,
        email,
        password,
      };
      const result = await this.userRepo.create(user);

      const cookie = this.getCookieWithJwtToken(result._id);

      result.password = undefined;
      return { result, cookie };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async login(authCredentialDto: Omit<AuthCredentialDto, 'email'>) {
    try {
      const { username, password } = authCredentialDto;

      const user = await this.userRepo.findOne({ username }).select('-__v');
      if (!user) {
        throw new BadRequestException();
      }
      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) {
        throw new BadRequestException();
      }
      const cookie = this.getCookieWithJwtToken(user.id);

      user.password = undefined;
      return { user, cookie };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async logout(data: string) {
    const logoutCookie = this.getCookieForLogOut();
    return { data, logoutCookie };
  }

  public getCookieForLogOut() {
    return cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/',
    });
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: +process.env.JWT_EXPIRATION_TIME,
      path: '/',
    });
  }

  public async verifyToken(token: any) {
    const { userId }: any = jwt.verify(token, process.env.JWT_SECRET);
    if (!userId) {
      return false;
    }
    return userId;
  }

  public async getUserById(userId: any) {
    const user = await this.userRepo.findOne({ _id: userId }).select('-__v');
    if (user) {
      return user;
    }
    return false;
  }
}
