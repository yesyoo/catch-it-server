import { Role } from "src/types"

export interface IUser {
    email: string,
    password: string,
    role: Role
};

export interface IUserData {
    username: string
    city?: string
    district?: string
    descripton?: string
    img?: string
    userId?: string
};