import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { filter } from 'rxjs';
import { ItemDto } from 'src/dto/item-dto';
import { ItemDataDto } from 'src/dto/itemdata-dto';
import { PersonalClothesDto } from 'src/dto/personal-dto';
import { DealType } from 'src/interfaces/items';
import { PersonalClothesDocument, Personal_Clothes } from 'src/schemas/item/personal/clothes-schema';
import { PersonalShoesDocument, Personal_Shoes } from 'src/schemas/item/personal/shoes-schema';

import { PersonalShoesDto } from '../../dto/personal-dto';

@Injectable()
export class ItemService {
    constructor(@InjectModel(Personal_Shoes.name) private personalShoesModel: Model<PersonalShoesDocument>,
                @InjectModel(Personal_Clothes.name) private personalClothesModel: Model<PersonalClothesDocument>) {}

    async getItems(params: any): Promise<any[]> {
        let res;
        let filter = {}

        if('dealType' in params) {
            filter['dealType'] = params.dealType
        }
        if('subcategoryType' in params) {
            filter['subcategoryType'] = params.subcategoryType
        }
        if('delivery' in params) {
            filter['itemProp.delivery'] = params.delivery
        }
        if('condition' in params) {
            filter['itemProp.condition'] = params.condition
        }
        if('type' in params) {
            filter['categoryProp.type'] = params.type
        } 
        if('size' in params) {
            filter['categoryProp.size'] = params.size
        }
        if('season' in params) {
            filter['categoryProp.season'] = params.season
        }
        if('color' in params) {
            filter['categoryProp.color'] = params.color
        }
        switch(params.collection) {
            case "personal-shoes":
                res = await this.personalShoesModel.find(filter)
                break;
            case "personal-clothes":
                res = await this.personalClothesModel.find(filter)
                break;
        }
        console.log('result', res)
        return res

    }
    async sendShoes(data: {userId: string, dealType: DealType, subcategoryType: string, form: {itemProp: ItemDto, categoryProp: PersonalShoesDto }}): Promise<any> {
        const item = data.form.itemProp
        const cat = data.form.categoryProp
        const obj = {
            userId: data.userId,
            dealType: data.dealType,
            subcategoryType: data.subcategoryType,
            itemState: new ItemDataDto(),
            itemProp: new ItemDto(item.title, item.description, item.condition, item.amount, item.city, item.district, item.delivery, item.img),
            categoryProp: new PersonalShoesDto(cat.type, cat.size, cat.season, cat.color, cat.gender, cat.age)
        }
        const post = new this.personalShoesModel(obj)
        post.save()    
    }

    async sendClothes(data: {userId: string, dealType: DealType, subcategoryType: string, form: {itemProp: ItemDto, categoryProp: PersonalClothesDto }}): Promise<any> {
        const item = data.form.itemProp
        const cat = data.form.categoryProp
        const obj = {
            userId: data.userId,
            dealType: data.dealType,
            subcategoryType: data.subcategoryType,
            itemState: new ItemDataDto(),
            itemProp: new ItemDto(item.title, item.description, item.condition, item.amount, item.city, item.district, item.delivery, item.img),
            categoryProp: new PersonalClothesDto(cat.type, cat.size, cat.season, cat.color, cat.gender, cat.age)
        }
        const post = new this.personalClothesModel(obj)
        post.save()    
    };

    async getByItemId(params): Promise<any> {
        let response
        switch(params.category) {
            case 'personal-shoes':
                response = await this.personalShoesModel.findOne({_id: params.itemId})
                break;
            case 'personal-clothes':
                response = await this.personalClothesModel.findOne({_id: params.itemId})
                break;
        }
        return response
    };

    // async getAllByCategory(params): Promise<any> {
    //     let response
    //     switch(params.category) {
    //         case 'personal-shoes':
    //             response = await this.personalShoesModel.find({_id: params.itemId})
    //             break;
    //         case 'personal-clothes':
    //             response = await this.personalClothesModel.find({_id: params.itemId})
    //             break;
    //     }
    //     return response
    // };
    async deleteAllByCategory(params): Promise<any> {
        let response
        switch(params.category) {
            case 'personal-shoes':
                response = await this.personalShoesModel.deleteMany({})
                break;
            case 'personal-clothes':
                response = await this.personalClothesModel.deleteMany({})
                break;
        }
        return response
    }
}


