import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingService {
  ingredientsChange = new Subject<Ingredient[]>();
  startingEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 2),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngridient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChange.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChange.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngridient: Ingredient) {
    this.ingredients[index] = newIngridient;
    this.ingredientsChange.next(this.ingredients.slice());
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChange.next(this.ingredients.slice());
  }
}
