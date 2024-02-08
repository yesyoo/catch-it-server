import { Controller, Post, Body, Get, Query, Delete, UseInterceptors, Patch } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IItemDB } from 'src/interfaces/items';
import { ItemService } from 'src/services/item/item.service';
import { diskStorage } from 'multer';



@Controller('items')
export class ItemsController {
    constructor(private itemService: ItemService) {}
    static imgName: string;

    @Post()
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
    postItem(@Body() data: {user: string, collection: string, category: string, deal: string, item: string, cat: string, img: any}) {
        data.img = ItemsController.imgName
        return this.itemService.postItem(data)
    };

    @Get('params')
    getByParams(@Query() params: any): Promise<IItemDB[]> { 
        return this.itemService.getByParams(params)
    };

    @Get('user')
    getByUserIdOwner(@Query('id') id: string): Promise<IItemDB[]> {
        return this.itemService.getByUserIdForOwner(id)
    };

    @Get('users')
    getByUserIdUsers(@Query('id') id: string): Promise<IItemDB[]> {
        return this.itemService.getByUserIdForUsers(id)
    };

    @Get('id')
    getById(@Query('id') id: string): Promise<IItemDB> {
        return this.itemService.getById(id)
    };

    @Delete('delete')
    deleteById(@Query() params: {id: string, collection: string}): Promise<any> {
        return this.itemService.deleteItem(params.id, params.collection)
    };

    @Delete('delete-all')
    deleteAll(@Query('collection') collection: string): Promise<any> {
        return this.itemService.deleteAll(collection)
    };   

    @Patch('update') 
    updateByParams(@Body() data: {id: string, collection: string, params: string}): Promise<any> {
        return this.itemService.updateByParams(data)
    };
}

