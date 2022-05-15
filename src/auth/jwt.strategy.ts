import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from './auth.module';
import { AuthService } from './auth.service';

export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secret: jwtSecret,
    });
  }

  async validate(payload: { userId: string }) {
    const User = await this.auth.validateUser(payload.userId);
  }
}
