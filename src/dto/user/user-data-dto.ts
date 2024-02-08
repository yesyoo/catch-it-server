import { IUserData } from "src/interfaces/user";

export class UserDataDto implements IUserData {
    username: string
    city: string
    district: string
    user: string

    constructor(user: {username: string, city: string, district: string, user: string}) {
        this.username = user.username
        this.city = user.city
        this.district = user.district
        this.user = user.user
    }
}