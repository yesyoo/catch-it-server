import { Controller, Post, Body, Delete, Param, Get, Query } from '@nestjs/common';
import { UserDataDto } from 'src/dto/user/user-data-dto';
import { UserService } from 'src/services/user/user.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UserService) {}

    @Get('admin/:id')
    checkRole(@Param('id') id: string): Promise<any> {
        return this.userService.checkRole(id)
    };

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
    getById(@Query('id') id: string): Promise<any> {
        return this.userService.getUserById(id)
    };

    @Get('user-data')
    getUserDataByUserId(@Query('user') id: string): Promise<any> {
        return this.userService.getUserDataByUserId(id)
    };
}
