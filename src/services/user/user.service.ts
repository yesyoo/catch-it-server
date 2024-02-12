import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User_data, UserDataDocument } from 'src/schemas/user/user-data-schema';
import { User, UserDocument } from 'src/schemas/user/user-schema';
import * as bcrypt from 'bcrypt'
import { UserDataDto } from '../../dto/user/user-data-dto';
import { JwtService } from '@nestjs/jwt';
import { ItemService } from '../item/item.service';

@Injectable()
export class UserService {
    constructor(private jwtService: JwtService,
                private itemServise: ItemService,
                @InjectModel(User.name) private userModel: Model<UserDocument>,
                @InjectModel(User_data.name) private userDataModel: Model<UserDataDocument>) {}

    async checkRole(id: string): Promise<any> {
        const user = await this.userModel.findById(id)
        console.log('role', user.role)
        return user.role
    };

    async register(data: {email: string, password: string, userData: UserDataDto}): Promise<any> {
       const isUser = await this.checkUser(data.email)
       if(!isUser) {
        const isUsername = await this.checkUsername(data.userData.username)
        if(!isUsername) {
            const salt = await bcrypt.genSalt(5)
            const hash = await bcrypt.hash(data.password, salt)
            const user = new this.userModel({email: data.email, password: hash, role: "user"})
            user.save()
    
            let updatedUserData = data.userData
            updatedUserData['user'] = user._id.toString()
            const userData = new this.userDataModel(new UserDataDto(updatedUserData))
            userData.save()
            return { user: user, userData: userData}
        } else {
            throw new HttpException( 
                {
                    status: HttpStatus.CONFLICT,
                    errorText: 'Username must be unique'
                }, 
                HttpStatus.CONFLICT)
           }
       } else {
        throw new HttpException( 
            {
                status: HttpStatus.CONFLICT,
                errorText: 'User already exists'
            }, 
            HttpStatus.CONFLICT)
       }
    };

    async checkUser(email: string): Promise<boolean> {
        let user = await this.userModel.findOne({email: email})
        if(!user) return false
        else return true
    };
    async checkUsername(username: string): Promise<boolean> {
        let user = await this.userDataModel.findOne({username: username})
        if(!user) return false
        else return true
    }

    async checkAuthUser(email: string, password: string): Promise<boolean> {
        const isUser = await this.userModel.findOne({email: email})
        if(isUser) {
            const hash = isUser.password
            return bcrypt.compare(password, hash) 
        } else {
            throw new HttpException( 
                {
                    status: HttpStatus.CONFLICT,
                    errorText: 'User not found'
                }, 
                HttpStatus.CONFLICT)
        }
    };

    async login(dto: {email: string, password: string}): Promise<any> {
        const isUser = await this.checkAuthUser(dto.email, dto.password)
        if(isUser) {
            const user = await this.userModel.findOne({email: dto.email})
            const id = user._id.toString()
            const role = user.role
            const payload = { email: dto.email, password: dto.password, role: role }
            return { access_token: this.jwtService.sign(payload), id, role }
        } else {
            throw new HttpException( 
                {
                    status: HttpStatus.CONFLICT,
                    errorText: 'Incorrect password'
                }, 
                HttpStatus.CONFLICT)
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
            console.log('User not found')
            throw new HttpException( 
                {
                    status: HttpStatus.CONFLICT,
                    errorText: 'User not found'
                }, 
                HttpStatus.CONFLICT)
           }
            //error
        
    };

    async getUserDataByUserId(id: string): Promise<any> {
        const userData = await this.userDataModel.findOne({user: id})
        if(userData) {
            return userData
        } else {
            console.log('User not found')
            throw new HttpException( 
                {
                    status: HttpStatus.CONFLICT,
                    errorText: 'User not found'
                }, 
                HttpStatus.CONFLICT)
        }
    };

    async updateUserData(id: string, data: any): Promise<User_data> {
        //UserDataDto new UserDataDto(data)
        const update = await this.userDataModel.findOneAndUpdate({user: id}, {})
        return update
    };

    async deleteById(id: string): Promise<any> {
        const userData = await this.userDataModel.findOneAndDelete({user: id});
        const user = await this.userModel.findByIdAndDelete(id);
        await this.itemServise.deleteAllByUserId(id).then(res => {
            if(userData === null && user === null) {
                return {message: `User ${id} deleted`}
            } else {
                console.log('Error')
                throw new HttpException( 
                    {
                        status: HttpStatus.CONFLICT,
                        errorText: 'Error'
                    }, 
                    HttpStatus.CONFLICT)
            };
        });
    };
};
