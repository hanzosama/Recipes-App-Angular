import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styles: [],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subcription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subcription = this.recipeService.recipesChange.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  onRecipeSelected(recipeEl: Recipe) {}

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
