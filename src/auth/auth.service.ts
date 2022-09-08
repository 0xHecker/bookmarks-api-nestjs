import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // save the new user in db
    try {
      const user = await this.prisma.users.create({
        data: {
          email: dto.email,
          hash,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      });
      //return the saved user

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(`credentials taken`);
        }
      }

      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find the user by email
    // if user does not exist throw exception
    const user = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('invalid credentials');
    }

    const passwordMatch = await argon.verify(
      user.hash,
      dto.password,
    );

    // compare password
    // if password is incorrect throw exception
    if (!passwordMatch)
      throw new ForbiddenException('invalid credentials');

    // send back the user
    async function signToken(
      userId: number,
      email: string,
    ) {
      const payload = {
        sub: userId,
        email,
      };
      return this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: '',
      });
    }
    return user;
  }
}
