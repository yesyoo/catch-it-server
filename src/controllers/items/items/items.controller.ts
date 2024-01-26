import { Controller, Post, Body, Get, Query, Delete } from '@nestjs/common';
import { DealType } from 'src/interfaces/items';
import { ItemService } from 'src/services/item/item.service';
import { ItemDto } from '../../../dto/item-dto';
import { PersonalShoesDto, PersonalClothesDto} from '../../../dto/personal-dto';



@Controller('items')
export class ItemsController {
    constructor(private itemService: ItemService) {}

    @Get()
    getItems(@Query() params: any): Promise<any[]> { 
        return this.itemService.getItems(params)
    };

    @Post('personal-shoes')
    setShoes(@Body() data: {userId: string, dealType: DealType, subcategoryType: string, form: {itemProp: ItemDto, categoryProp: PersonalShoesDto }}): Promise<any> {
        return this.itemService.sendShoes(data)
    };

    @Post('personal-clothes')

    setClothes(@Body() data: {userId: string, dealType: DealType, subcategoryType: string, form: {itemProp: ItemDto, categoryProp: PersonalClothesDto }}): Promise<any> {
        return this.itemService.sendClothes(data)
    };

    // @Get("get-by-category")
    // getAllByCategory(@Query() params): Promise<any> {
    //     return this.itemService.getAllByCategory(params)
    // };

    @Get("get-by-item-id")
    getByItemId(@Query() params): Promise<any> {
        return this.itemService.getByItemId(params)
    };

    @Delete()
    deleteAllByCategory(@Query() params): Promise<any> {
        return this.itemService.deleteAllByCategory(params)
    }
}
