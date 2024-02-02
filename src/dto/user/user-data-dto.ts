import { IUserData } from "src/interfaces/user";

export class UserDataDto implements IUserData {

    username: string
    city: string
    district: string
    userId: string

    constructor(user: {username: string, city: string, district: string, userId: string}) {
        this.username = user.username
        this.city = user.city
        this.district = user.district
        this.userId = user.userId
    }
}