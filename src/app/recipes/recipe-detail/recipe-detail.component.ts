import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styles: [],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(
    private recipeService: RecipeService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.activeRoute });
  }
}
