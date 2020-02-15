import { DishIngredient } from './dish-ingredient';
import { DishCategory } from './dish-category';

export class Dish {
    public uid: number;
    public name: string;
    public calories: number;
    public price: number;
    public weight: number;
    public photo: string;
    public categories: DishCategory[];
    public dishIngredients: DishIngredient[];
    public unit() {
        return this.categories.some(c => c.uid === 4) ?
        'мл' :
        'гр';
    }
}