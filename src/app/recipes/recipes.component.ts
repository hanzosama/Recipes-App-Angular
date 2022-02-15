import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit, OnDestroy {
  seletedRecipe: Recipe;
  recipeSubs: Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeSubs = this.recipeService.recipeSelected.subscribe((recipe) => {
      this.seletedRecipe = recipe;
    });
  }

  ngOnDestroy(): void {
    this.recipeSubs.unsubscribe();
  }
}
