import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingService {
  ingredientsChange = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 2),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChange.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChange.emit(this.ingredients.slice());
  }
}
