import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/services/user/user.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({usernameField: 'email', passwordField: 'password'});
    };

    async validate(email: string, password: string): Promise<boolean> {
        const user: boolean = await this.userService.checkAuthUser(email, password);
        if(user) {
            return true 
        } else {
            throw new HttpException( 
                {
                    status: HttpStatus.CONFLICT,
                    errorText: 'Неверный пароль'
                }, 
                HttpStatus.CONFLICT)
        }
    };
}