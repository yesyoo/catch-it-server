import { Controller, Post, Body, Get, Query, Delete } from '@nestjs/common';
import { DealType } from 'src/interfaces/items';
import { ItemService } from 'src/services/item/item.service';
import { ItemDto } from '../../../dto/item/item-dto';
import { PersonalShoesDto, PersonalClothesDto } from '../../../dto/item/personal-dto';



@Controller('items')
export class ItemsController {
    constructor(private itemService: ItemService) {}



    @Post('personal-shoes')
    setShoes(@Body() data: {userId: string, collection: string, category: string, deal: string, item: ItemDto, itemCat: PersonalShoesDto}): Promise<any> {
        return this.itemService.sendShoes(data)
    };

    @Post('personal-clothes')
    setClothes(@Body() data: {userId: string, collection: string, category: string, deal: string, item: ItemDto, itemCat: PersonalClothesDto}): Promise<any> {
        return this.itemService.sendClothes(data)
    };

    // @Get("get-by-item-id")
    // getByItemId(@Query() params): Promise<any> {
    //     return this.itemService.getByItemId(params)
    // };

    @Delete()
    deleteAllByCategory(@Query() params): Promise<any> {
        return this.itemService.deleteAllByCategory(params)
    };

    @Delete('delete')
    deleteItem(@Query() params): Promise<any> {
        console.log('del')
        return this.itemService.deleteItem(params)
    }

    @Get()
    getItems(@Query() params: any): Promise<any[]> { 
        return this.itemService.getItemsByParams(params)
    };

    @Get('user')
    getAllByUserId(@Query() params): Promise<any> {
        return this.itemService.getAllByUserId(params.userId)
    }
}
