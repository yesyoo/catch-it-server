import { Controller, Post, Body, Get, Query, Delete, UseInterceptors, Patch, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IItemDB } from 'src/interfaces/items';
import { ItemService } from 'src/services/item/item.service';
import { diskStorage } from 'multer';
import { IItemBookmark, IUserListItem, IUserListItemAccess } from 'src/interfaces/bookmark';




@Controller('items')
export class ItemsController {
    constructor(private itemService: ItemService) {}
    static imgName: string;

    @Post('create')
    @UseInterceptors(FileInterceptor('img', {
        storage: diskStorage(
            {
                destination: './public/',
                filename: (req, file, newName) => {
                    console.log('file =?')
                    const imgType = file.mimetype.split('/');
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                    const imgName = file.fieldname + '-' + uniqueSuffix + '.' + imgType[1];
                    newName(null, imgName)
                    ItemsController.imgName = imgName
                }
            }
        )
    }))
    create(@Body() data: {user: string, collection: string, category: string, deal: string, item: string, cat: string, img: any}) {
        data.img = ItemsController.imgName
        return this.itemService.createItem(data)
    };

    @Get('get-one')
    getOneById(@Query('id') id: string): Promise<IItemDB> {
        return this.itemService.getOneById(id)
    };
    @Get('get-many-by-params')
    getManyByParams(@Query() params: string): Promise<IItemDB[]> { 
        return this.itemService.getManyByParams(params)
    };
    @Post('get-many')
    getManyFromArray(@Body() dto: IUserListItem[]): Promise<any> {
        return this.itemService.getManyByIdFromArray(dto)
    };
    @Get('owner')
    getManyByOwnerId(@Query('id') id: string): Promise<IItemDB[]> {
        return this.itemService.getAllByOwnerId(id)
    };
    @Get('user')
    getByUserIdUsers(@Query('id') id: string): Promise<IItemDB[]> {
        return this.itemService.getManyByUserId(id)
    };

    @Delete('delete-one')
    deleteById(@Query() params: IUserListItem): Promise<any> {
        return this.itemService.deleteOneById(params)
    };
    @Post('delete-many')
    deleteMany(@Body() array: IUserListItem[]): Promise<any> {
        return this.itemService.deleteMany(array)
    };

    @Delete('user') 
    deleteByUserId(@Query('id') id: string): Promise<any> {
        return this.itemService.deleteAllByUserId(id)
    };

    @Patch('access') 
    updateAccess(@Body() array: IUserListItemAccess[]): Promise<string> {
        return this.itemService.updateAccess(array)
    };
}

