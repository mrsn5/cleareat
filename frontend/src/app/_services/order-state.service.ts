import { Injectable } from '@angular/core';
import { OrderState } from '../_models/order-state';
import { Dish } from '../_models/dish';

@Injectable()
export class OrderStateService {
    private static readonly KEY = 'caprezzy_order_state';
    private state: OrderState;
    constructor() { this.load(); }

    public setSelected(dish: Dish, count: number): void {
        if (count > 0) {
            this.state[dish.uid] = { price: dish.price, quantity: count};
        } else {
            delete this.state[dish.uid];
        }
        this.save();
    }

    public getSelected(dishUid: number): number {
        return (this.state[dishUid] && this.state[dishUid].quantity) || 0;
    }

    public getDishes(): number[] {
        return Object.keys(this.state).map(_ => Number(_));
    }

    public defined(): boolean {
        return Object.keys(this.state).length !== 0;
    }

    public clear(): void {
        this.state = {};
        this.save();
    }

    public total(): number {
        return Object.keys(this.state)
            .map(id => this.state[id].quantity * this.state[id].price)
            .reduce((x, y) => x + y);
    }

    private load(): void {
        const loaded = localStorage.getItem(OrderStateService.KEY)
        this.state = loaded != null ? JSON.parse(loaded) : {};
    }

    private save(): void {
        localStorage.setItem(OrderStateService.KEY, JSON.stringify(this.state));
    }

}