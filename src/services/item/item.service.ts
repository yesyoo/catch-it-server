import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemDto } from 'src/dto/item/item-dto';
import { PersonalClothesDto } from 'src/dto/item/personal-dto';
import { IItemDB } from 'src/interfaces/items';
import { PersonalClothesDocument, Personal_Clothes } from 'src/schemas/item/personal/clothes-schema';
import { PersonalShoesDocument, Personal_Shoes } from 'src/schemas/item/personal/shoes-schema';
import { PersonalShoesDto } from '../../dto/item/personal-dto';

@Injectable()
export class ItemService {
    constructor(@InjectModel(Personal_Shoes.name) private personalShoesModel: Model<PersonalShoesDocument>,
                @InjectModel(Personal_Clothes.name) private personalClothesModel: Model<PersonalClothesDocument>) {}

    async getByParams(params: any): Promise<IItemDB[]> {
        let filter = {}
        if('deal' in params) filter['deal'] = params.deal
        if('category' in params) filter['category'] = params.category
        if('delivery' in params) filter['item.delivery'] = params.delivery
        if('condition' in params) filter['item.condition'] = params.condition
        if('type' in params) filter['cat.type'] = params.type
        if('size' in params) filter['cat.size'] = params.size
        if('season' in params) filter['cat.season'] = params.season
        if('color' in params) filter['cat.color'] = params.color
        filter['show'] = true
        
        switch(params.collection) {
            case "personal-shoes":
                console.log(await this.personalShoesModel.find(filter))
                return await this.personalShoesModel.find(filter)
            case "personal-clothes":
                return await this.personalClothesModel.find(filter)
        };
    };

    async postItem(data: {user: string, collection: string, category: string, deal: string, item: string, cat: string, img: string }): Promise<any> {
        const item = JSON.parse(data.item)
        const cat = JSON.parse(data.cat)
        console.log('deal', data.deal)
        let obj = {
            user: data.user,
            collection: data.collection,
            category: data.category,
            deal: data.deal,
            date: Date.now(),
            show: true,
            reserved: false,
            blocked: false,
            item: new ItemDto(item.title, item.description, item.condition, item.amount, item.city, item.district, item.delivery),
            img: data.img
        };
        switch(data.collection) {
            case 'personal-clothes':
                obj['cat'] = new PersonalClothesDto(data.category, cat.type, cat.size, cat.season, cat.color);
                return new this.personalClothesModel(obj).save()  
            case 'personal-shoes': 
                obj['cat'] = new PersonalShoesDto(data.category, cat.type, cat.size, cat.season, cat.color);
                return new this.personalShoesModel(obj).save()  
        }
    };

    async deleteAll(collection: string): Promise<any> {
        switch(collection) {
            case 'personal-shoes':
                return await this.personalShoesModel.deleteMany({})
            case 'personal-clothes':
                return await this.personalClothesModel.deleteMany({})
        };
    };

    async getByUserIdForOwner(id: string): Promise<any>{
        return this.getByUserId(id, false)
    };

    async getByUserIdForUsers(id: string): Promise<any> {
        return this.getByUserId(id, true)
    };

    async getByUserId(id: string, show: boolean): Promise<any[]> {
        const models = this.models()
        let result: IItemDB[] = []
        return new Promise((res) => {
            (async () => {
                for(let i = 0; i < models.length; i++) {
                    if(show === true) {
                        await models[i].find({user: id, show: true}).then((data: IItemDB[]) => {
                            if(data.length > 0) data.forEach(obj => result.push(obj))
                        })
                    } else {
                        await models[i].find({user: id}).then((data: IItemDB[]) => {
                            if(data.length > 0) data.forEach(obj => result.push(obj))
                        })
                    }
                };
                res(result)
            })();
        });
    };

    async getById(id: string): Promise<any> {
        const models: any[] = this.models()
        return new Promise((res) => {
            models.forEach(async model => {
                await model.findById(id).then((data: IItemDB) => {
                    if(data) res(data)
                })
            })
        });
    };

    async deleteItem(id: string, collection: string): Promise<any> {
        switch(collection) {
            case 'personal-shoes':
                return await this.personalShoesModel.findByIdAndDelete(id)
            case 'personal-clothes':
                return await this.personalClothesModel.findByIdAndDelete(id)
        };
    };

    updateByParams(data: {id: string, collection: string, params: string}): Promise<any> {
        const obj = JSON.parse(data.params)
        switch(data.collection) {
            case 'personal-shoes':
                return this.personalShoesModel.findByIdAndUpdate(data.id, obj)
            case 'personal-clothes':
                return this.personalClothesModel.findByIdAndUpdate(data.id, obj)
        };
    };
    
    models(): any[] {
        return [this.personalShoesModel, this.personalClothesModel]
    };
}


