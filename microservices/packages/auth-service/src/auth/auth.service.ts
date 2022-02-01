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

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userRepo: ReturnModelType<typeof User>,
    private jwtService: JwtService,
  ) {}

  async register(authCredentialDto: AuthCredentialDto) {
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

      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async login(
    authCredentialDto: Omit<AuthCredentialDto, 'email'>,
    res: Response,
  ) {
    const { username, password } = authCredentialDto;

    const user = await this.userRepo.findOne({ username });
    if (!user) {
      throw new BadRequestException();
    }
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new BadRequestException();
    }
    const cookie = this.getCookieWithJwtToken(user.id);

    res.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return res.send(user);
  }

  async logout(res: Response) {
    res.setHeader('Set-Cookie', this.getCookieForLogOut());
    return res.status(200).json({ success: true });
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

  public async getUserById(userId: number) {
    const user = await this.userRepo.findOne({ id: userId });
    if (user) {
      return user;
    }
    throw new HttpException(
      'UserEntity with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  public async customGetUserById(userId: number) {
    const user = await this.userRepo.findOne({ id: userId });
    if (user) {
      return user;
    }
    return false;
  }
}
