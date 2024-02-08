import { IItemState } from 'src/interfaces/items';

export class ItemDataDto implements IItemState {
    date: number
    show: boolean
    reserved: boolean
    blocked: boolean
    
    constructor() {
        this.date = Date.now()
        this.show = true
        this.reserved = false
        this.blocked = false
    };
};