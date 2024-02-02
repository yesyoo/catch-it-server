import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UserAuthDto } from 'src/dto/user/auth-dto';
import { User_data, UserDataDocument } from 'src/schemas/user/user-data-schema';
import { User, UserDocument } from 'src/schemas/user/user-schema';
import * as bcrypt from 'bcrypt'
import { UserDataDto } from '../../dto/user/user-data-dto';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from 'src/types';

@Injectable()
export class UserService {
    constructor(private jwtService: JwtService,
                @InjectModel(User.name) private userModel: Model<UserDocument>,
                @InjectModel(User_data.name) private userDataModel: Model<UserDataDocument>) {}

    async register(data: {email: string, password: string, userData: UserDataDto}): Promise<any> {
        console.log('reg', data)
       const isUser = await this.checkUser(data.email)
       if(!isUser) {
        const salt = await bcrypt.genSalt(5)
        const hash = await bcrypt.hash(data.password, salt)
        const user = new this.userModel({email: data.email, password: hash, role: "user"})
        user.save()
    
        let updatedUserData = data.userData
        updatedUserData['userId'] = user._id.toString()
        console.log('up', updatedUserData)
        const userData = new this.userDataModel(new UserDataDto(updatedUserData))
        userData.save()
        return { user: user, userData: userData}
       }
    };

    async checkUser(email: string): Promise<boolean> {
        let user = await this.userModel.findOne({email: email})
        if(!user) return false
        else return true
    };

    async checkAuthUser(email: string, password: string): Promise<boolean> {
        const isUser = await this.userModel.findOne({email: email})
        if(isUser) {
            const hash = isUser.password
            return bcrypt.compare(password, hash) 
        } else { return false }
    };

    async login(dto: {email: string, password: string}): Promise<any> {
        const isUser = await this.checkAuthUser(dto.email, dto.password)
        if(isUser) {
            const payload = { email: dto.email, password: dto.password }
            const user = await this.userModel.findOne({email: dto.email})
            const id = user._id.toString()
            return { access_token: this.jwtService.sign(payload), id }
        } else {
            console.log('error login')
        }
    };

    async getHash(email: string): Promise<string> {
        const user = await this.userModel.findOne({email: email})
        if(user) {
            return user.password
        } else {
            //error
        }
    };

    async getUserById(id: string): Promise<User> {
        const user = await this.userModel.findById(id)
        if(user) {
            return user
        } else {
            //error
        }
    };

    async getUserDataByUserId(userId: string): Promise<any> {
        console.log('userId =>', userId)
        const userData = await this.userDataModel.findOne({userId: userId})
        if(userData) {
            return userData
        } else {
            //error
        }
    };

    async updateUserData(userId: string, data: any): Promise<User_data> {
        //UserDataDto new UserDataDto(data)
        const update = await this.userDataModel.findOneAndUpdate({userId: userId}, {})
        return update
    };

    async deleteById(id: string): Promise<any> {
        const userData = await this.userDataModel.findOneAndDelete({userId: id})
        const user = await this.userModel.findByIdAndDelete(id)
        return {user: user, userData: userData}
    };

}
