import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from 'src/static/private/constants';
import { Payload } from 'src/types';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: jwtConstants.secret,
        });
      }
      async validate(payload: any) {
        const token = { userId: payload.sub, username: payload.username, role: payload.role }
        return token
      }

}
