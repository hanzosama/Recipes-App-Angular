import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: [],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.shoppingService.ingredientsChange.subscribe((ingredient) => {
      this.ingredients = ingredient;
    });
  }
}
