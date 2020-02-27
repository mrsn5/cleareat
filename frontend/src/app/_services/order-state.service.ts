import { Injectable } from '@angular/core';
import { OrderState } from '../_models/order-state';

@Injectable()
export class OrderStateService {
    private static readonly KEY = 'caprezzy_order_state';
    private state: OrderState;
    constructor() { this.load(); }

    public setSelected(dishUid: number, count: number): void {
        if (count > 0) {
            this.state[dishUid] = count;
        } else {
            delete this.state[dishUid];
        }
        this.save();
    }

    public getSelected(dishUid: number): number {
        return this.state[dishUid] || 0;
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

    private load(): void {
        const loaded = localStorage.getItem(OrderStateService.KEY)
        this.state = loaded != null ? JSON.parse(loaded) : {};
    }

    private save(): void {
        localStorage.setItem(OrderStateService.KEY, JSON.stringify(this.state));
    }
}