import { IUser } from "src/interfaces/user";

export class UserAuthDto {
    email: string
    password: string
    
    constructor(email: string, password: string) {
        this.email = email
        this.password = password
    };
};