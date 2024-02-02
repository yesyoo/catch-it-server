import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { filter } from 'rxjs';
import { ItemDto } from 'src/dto/item/item-dto';
import { ItemDataDto } from 'src/dto/item/itemdata-dto';
import { PersonalClothesDto } from 'src/dto/item/personal-dto';
import { DealType } from 'src/interfaces/items';
import { PersonalClothesDocument, Personal_Clothes } from 'src/schemas/item/personal/clothes-schema';
import { PersonalShoesDocument, Personal_Shoes } from 'src/schemas/item/personal/shoes-schema';
import { PersonalShoesDto } from '../../dto/item/personal-dto';

@Injectable()
export class ItemService {
    constructor(@InjectModel(Personal_Shoes.name) private personalShoesModel: Model<PersonalShoesDocument>,
                @InjectModel(Personal_Clothes.name) private personalClothesModel: Model<PersonalClothesDocument>) {}

    async getItemsByParams(params: any): Promise<any[]> {
        let result: any[] = []
        let filter = {}

        if('deal' in params) filter['deal'] = params.deal
        if('category' in params) filter['category'] = params.category
        if('delivery' in params) filter['item.delivery'] = params.delivery
        if('condition' in params) filter['item.condition'] = params.condition
        if('type' in params) filter['itemCat.type'] = params.type
        if('size' in params) filter['itemCat.size'] = params.size
        if('season' in params) filter['itemCat.season'] = params.season
        if('color' in params) filter['itemCat.color'] = params.color
        
        switch(params.collection) {
            case "personal-shoes":
                result = await this.personalShoesModel.find(filter)
                break;
            case "personal-clothes":
                result = await this.personalClothesModel.find(filter)
                break;
        }
        return result

    }
    async sendShoes(data: {userId: string, collection: string, category: string, deal: string, item: ItemDto, itemCat: PersonalShoesDto}): Promise<any> {
        const item = data.item
        const cat = data.itemCat
        const obj = {
            userId: data.userId,
            collection: data.collection,
            category: data.category,
            deal: data.deal,
            itemState: new ItemDataDto(),
            item: new ItemDto(item.title, item.description, item.condition, item.amount, item.city, item.district, item.delivery, item.img),
            itemCat: new PersonalShoesDto(cat.type, cat.size, cat.season, cat.color, cat.gender, cat.age)
        }
        const post = new this.personalShoesModel(obj)
        post.save()    
    }

    async sendClothes(data: {userId: string, collection: string, category: string, deal: string, item: ItemDto, itemCat: PersonalClothesDto}): Promise<any> {
        const item = data.item
        const cat = data.itemCat
        const obj = {
            userId: data.userId,
            collection: data.collection,
            category: data.category,
            deal: data.deal,
            itemState: new ItemDataDto(),
            item: new ItemDto(item.title, item.description, item.condition, item.amount, item.city, item.district, item.delivery, item.img),
            itemCat: new PersonalClothesDto(cat.type, cat.size, cat.season, cat.color, cat.gender, cat.age)
        }
        const post = new this.personalClothesModel(obj)
        post.save()    
    };

    async getByItemId(params): Promise<any> {
        let response
        switch(params.collection) {
            case 'personal-shoes':
                response = await this.personalShoesModel.findOne({_id: params.itemId})
                break;
            case 'personal-clothes':
                response = await this.personalClothesModel.findOne({_id: params.itemId})
                break;
        }
        return response
    };

    async deleteAllByCategory(params): Promise<any> {
        let response
        switch(params.collection) {
            case 'personal-shoes':
                response = await this.personalShoesModel.deleteMany({})
                break;
            case 'personal-clothes':
                response = await this.personalClothesModel.deleteMany({})
                break;
        }
        return response
    };

    async getAllByUserId(userId: string): Promise<any[]> {
        let resultArr: any[] = []
        let shoesArr = await this.personalShoesModel.find({userId: userId});
        let clothesArr = await this.personalClothesModel.find({userId: userId});
        
        if(shoesArr.length !== 0) {
            shoesArr.forEach(item => resultArr.push(item))
        }
        if(clothesArr.length !== 0) {
            clothesArr.forEach(item => resultArr.push(item))
        }
        console.log(resultArr)
        return resultArr
    };
    async deleteItem(params): Promise<any> {
        if(params.collection === "personal-shoes") {
            await this.personalShoesModel.findByIdAndDelete(params.id)
            return { response:'success'}
        }
        
    }
}


