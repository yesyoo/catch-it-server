import { Condition, Delivery, IItem } from 'src/interfaces/items';

export class ItemDto implements IItem {
    title: string;
    description: string;
    condition?: Condition;
    amount?: number;
    city: string;
    district: string;
    delivery?: Delivery;

    constructor(title: string, description: string, condition: Condition, amount: number, city: string, district: string, delivery: Delivery) {
        this.title = title
        this.description = description
        this.condition = condition
        this.amount = amount
        this.city = city
        this.district = district
        this.delivery = delivery
    };
};