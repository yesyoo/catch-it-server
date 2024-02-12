import { Controller, Post, Body, Get, Query, Delete, UseInterceptors, Patch, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IItemDB } from 'src/interfaces/items';
import { ItemService } from 'src/services/item/item.service';
import { diskStorage } from 'multer';
import { query } from 'express';
import { IItemBookmark } from 'src/interfaces/bookmark';



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

    @Get('get-one-by-id')
    getOneById(@Query('id') id: string): Promise<IItemDB> {
        return this.itemService.getOneById(id)
    };
    @Get('get-many-by-params')
    getManyByParams(@Query() params: string): Promise<IItemDB[]> { 
        return this.itemService.getManyByParams(params)
    };
    @Get('get-all-by-owner-id')
    getManyByOwnerId(@Query('id') id: string): Promise<IItemDB[]> {
        return this.itemService.getAllByOwnerId(id)
    };
    @Get('get-many-by-user-id')
    getByUserIdUsers(@Query('id') id: string): Promise<IItemDB[]> {
        return this.itemService.getManyByUserId(id)
    };
    @Post('get-many-from-array')
    getManyFromArray(@Body() dto: IItemBookmark[]): Promise<any> {
        console.log('goo')
        return this.itemService.getManyByIdFromArray(dto)
    }


    @Delete('delete-one-by-id-and-collection')
    deleteById(@Query() params: {id: string, collection: string}): Promise<any> {
        console.log('we try delete ', params.id)
        return this.itemService.deleteOneById(params.id, params.collection)
    };
    @Post('delete-by-id-and-collection-from-array')
    deleteByIdAndCollectionFromArray(@Body() array: {id: string, collection: string}[]): Promise<any> {
        return this.itemService.deleteByIdAndCollectionFromArray(array)
    };
    @Delete('delete-all-in-collection')
    deleteAllInCollection(@Query('collection') collection: string): Promise<any> {
        return this.itemService.deleteAllInCollection(collection)
    };  
    @Delete('delete-all-by-user-id') 
    deleteByUserId(@Query('id') id: string): Promise<any> {
        return this.itemService.deleteAllByUserId(id)
    };


    @Patch('update-show-hide-from-array') 
    updateShowHideFromArray(@Body() array: {id: string, collection: string, show: boolean}[]): Promise<string> {
        console.log('мы на беке')
        return this.itemService.updateShowHideFromArray(array)
    };
}

