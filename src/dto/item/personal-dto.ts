import { ShoesType, ShoesSize, Color, ClothesType, ClothesSize, Season, Gender } from 'src/interfaces/items';

export class PersonalShoesDto {
    type: ShoesType;
    size: ShoesSize;
    season: Season;
    color: Color;
    gender: Gender;
    age: string

    constructor(type: ShoesType, size: ShoesSize, season: Season, color: Color, gender: Gender, age: string) {
        this.type = type
        this.size = size
        this.season = season
        this.color = color
        this.gender = gender
        this.age = age
    };
};

export class PersonalClothesDto {
    type: ClothesType
    size: ClothesSize
    season: Season
    color: Color
    gender: Gender;
    age: string

    constructor(type: ClothesType, size: ClothesSize, season: Season, color: Color, gender: Gender, age: string) {
        this.type = type
        this.size = size
        this.season = season
        this.color = color
        this.gender = gender
        this.age = age
    };
};


