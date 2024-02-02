import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
    public secret: string = 'qwerty'
    constructor() {

    }
}
