import { Condition, Delivery, IItem } from 'src/interfaces/items';

export class ItemDto implements IItem {
    title: string;
    description: string;
    condition?: Condition;
    amount?: number;
    city: string;
    district: string;
    delivery?: Delivery;
    img?: string;

    constructor(title: string, description: string, condition: Condition, amount: number, city: string, district: string, delivery: Delivery, img: string) {
        this.title = title
        this.description = description
        this.condition = condition
        this.amount = amount
        this.city = city
        this.district = district
        this.delivery = delivery
        this.img = img
    };
};