import { Controller, Post, Body, Delete, Param, Get, Query, Put } from '@nestjs/common';
import { UserDataDto } from 'src/dto/user/user-data-dto';
import { User_data } from 'src/schemas/user/user-data-schema';
import { User } from 'src/schemas/user/user-schema';
import { UserService } from 'src/services/user/user.service';


@Controller('users')
export class UsersController {

    constructor(private userService: UserService) {}

    @Post('register')
    register(@Body() dto: {email: string, password: string, userData: UserDataDto}): Promise<any> {
        return this.userService.register(dto)
    };

    @Post('login')
    login(@Body() dto: {email: string, password: string}): Promise<any> {
        return this.userService.login(dto)
    };

    @Delete('delete/:id')
    deleteById(@Param() id: string): Promise<any> {
        return this.userService.deleteById(id)
    };

    @Get('id')
    getById(@Query('id') id): Promise<any> {
        return this.userService.getUserById(id)
    };

    @Get('user-data')
    getUserDataByUserId(@Query('userId') userId: string): Promise<any> {
        return this.userService.getUserDataByUserId(userId)
    };

   


  
}
