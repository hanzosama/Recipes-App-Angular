import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: [],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  shoppingSubscription: Subscription;
  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.shoppingSubscription =
      this.shoppingService.ingredientsChange.subscribe((ingredient) => {
        this.ingredients = ingredient;
      });
  }

  ngOnDestroy(): void {
    this.shoppingSubscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingService.startingEditing.next(index);
  }
}
