import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemDto } from 'src/dto/item/item-dto';
import { PersonalClothesDto } from 'src/dto/item/personal-dto';
import { IItemBookmark } from 'src/interfaces/bookmark';
import { IItemDB } from 'src/interfaces/items';
import { PersonalClothesDocument, Personal_Clothes } from 'src/schemas/item/personal/clothes-schema';
import { PersonalShoesDocument, Personal_Shoes } from 'src/schemas/item/personal/shoes-schema';
import { PersonalShoesDto } from '../../dto/item/personal-dto';

@Injectable()
export class ItemService {
    constructor(@InjectModel(Personal_Shoes.name) private personalShoesModel: Model<PersonalShoesDocument>,
                @InjectModel(Personal_Clothes.name) private personalClothesModel: Model<PersonalClothesDocument>) {}

    async createItem(data: {user: string, collection: string, category: string, deal: string, item: string, cat: string, img: string }): Promise<any> {
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

    async getOneById(id: string): Promise<any> {
        const models = this.models()
        let obj: IItemDB;
        return new Promise(res => {
            (async () => {
                for(let i = 0; i < models.length; i++) {
                    obj = await models[i].findById(id)
                    if(obj) {
                        res(obj)
                    }
                }
            })()
        })
    }
         
    async getManyByIdFromArray(array: IItemBookmark[]): Promise<any> {
        return new Promise(res => {
            let resultArr: any[] = [];
            (async () => {
                for(let i = 0; i < array.length; i++) {
                    switch(array[i].collection) {
                        case 'personal-shoes':
                            const shoes = await this.personalShoesModel.findOne({_id: array[i].itemId, show: true})
                            resultArr.push(shoes)
                            break;
                        case 'personal-clothes': 
                            const clothes = await this.personalClothesModel.findOne({_id: array[i].itemId, show: true})
                            resultArr.push(clothes)
                            break;
                    }
                }
                res(resultArr)
            })()
        })
    }

    async getManyByParams(params: any): Promise<IItemDB[]> {
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
                return await this.personalShoesModel.find(filter)
            case "personal-clothes":
                return await this.personalClothesModel.find(filter)
        };
    };

    async getAllByOwnerId(id: string): Promise<any> {
        const models = this.models()
        let result: IItemDB[] = []
        return new Promise((res) => {
            (async () => {
                for(let i = 0; i < models.length; i++) {
                    await models[i].find({user: id}).then((data: IItemDB[]) => {
                        if(data.length > 0) {
                            data.forEach(obj => result.push(obj))
                        }
                    });  
                };
                res(result)

            })();
        })
    };

    async getManyByUserId(id: string): Promise<any[]> {
        const models = this.models()
        let result: IItemDB[] = []
        return new Promise((res) => {
            (async () => {
                for(let i = 0; i < models.length; i++) {
                    await models[i].find({user: id, show: true}).then((data: IItemDB[]) => {
                        if(data.length > 0) data.forEach(obj => result.push(obj))
                    })
                };
                res(result)
                
            })();
        });
    };

    async deleteOneById(id: string, collection: string): Promise<any> {
        switch(collection) {
            case 'personal-shoes':
                return await this.personalShoesModel.findByIdAndDelete(id);
            case 'personal-clothes':
                return await this.personalClothesModel.findByIdAndDelete(id)
        };
    };

    async deleteByIdAndCollectionFromArray(array: {id: string, collection: string}[]): Promise<any> {
        return new Promise(res => {
            (async () => {
                for(let i = 0; i < array.length; i++) {
                    switch(array[i].collection) {
                        case 'personal-shoes':
                            await this.personalShoesModel.findByIdAndDelete(array[i].id)
                                
                        case 'personal-clothes':
                            await this.personalClothesModel.findByIdAndDelete(array[i].id)
                    };
                    res(true);
                };   
            })();
        })    
    };

    async deleteAllInCollection(collection: string): Promise<any> {
        switch(collection) {
            case 'personal-shoes':
                return await this.personalShoesModel.deleteMany({})
            case 'personal-clothes':
                return await this.personalClothesModel.deleteMany({})
        };
    };

    async deleteAllByUserId(id: string): Promise<any> {
        const models = this.models();
        return new Promise((res) => {
            (async () => {
                for(let i = 0; i < models.length; i++) {
                    await models[i].deleteMany({user: id}) 
                };
                res('Deleted')
            })();
        });
    };
 ////////////////////////////////////////////////////////////////////////////////////////////////// 
    async updateAccessFromArray(array: {id: string, collection: string, show: boolean}[]): Promise<any> {       
        return new Promise(res => {
            (async () => {
                for(let i = 0; i < array.length; i++) {
                    switch(array[i].collection) {
                        case 'personal-shoes':
                            await this.personalShoesModel.findByIdAndUpdate(array[i].id, {show: array[i].show})
                        case 'personal-clothes':
                            await this.personalClothesModel.findByIdAndUpdate(array[i].id, {show: array[i].show})
                    };
                    
                }; 
                res('Success') 
            })();
        })    
    };
//////////////////////////////////////////////////////////////////////////////////////////////////
    models(): any[] {
        return [this.personalShoesModel, this.personalClothesModel]
    };
}


