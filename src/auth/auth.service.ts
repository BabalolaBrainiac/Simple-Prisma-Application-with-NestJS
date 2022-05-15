import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException(
        'The email you have entered does not belong to a User',
      );
    }
    const isValid = password === user.password;
    if (!isValid) {
      throw new UnauthorizedException(
        'The password you have entered is not corred',
      );
    }
    return {
      accessToken: this.jwt.sign({ userId: user.id }),
    };
  }

  validateUser(id: string) {
    const user = this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }
    return user;
  }
}
