import { ObjectId, Types } from "mongoose"
import { IUser, IUserData } from "src/interfaces/user"
import { Role } from "./role"

export type LoginResponse = {
    access_token: string,
    userData: IUserData
}

export type Payload = {
    userId: string,
    username: string
}