import { ShoesType, ShoesSize, Color, ClothesType, ClothesSize, Season, Gender } from 'src/interfaces/items';

export class PersonalShoesDto {
    type: ShoesType;
    size: ShoesSize;
    season: Season;
    color: Color;
    gender: Gender;
    adult: boolean

    constructor(category: string, type: ShoesType, size: ShoesSize, season: Season, color: Color) {
        this.type = type
        this.size = size
        this.season = season
        this.color = color
        category.includes('child') ? this.adult = false : this.adult = true
        !category.includes('male') ? this.gender = 'genderless' : 
        category.includes('female') ? this.gender = 'female' : this.gender = 'male'
    };
};

export class PersonalClothesDto {
    type: ClothesType
    size: ClothesSize
    season: Season
    color: Color
    gender: Gender;
    adult: boolean;

    constructor(category: string, type: ClothesType, size: ClothesSize, season: Season, color: Color) {
        this.type = type
        this.size = size
        this.season = season
        this.color = color
        category.includes('child') ? this.adult = false : this.adult = true
        !category.includes('male') ? this.gender = 'genderless' : 
        category.includes('female') ? this.gender = 'female' : this.gender = 'male'
    };
};


