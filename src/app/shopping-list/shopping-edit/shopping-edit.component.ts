import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppinListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: [],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('formEdit') formEdit: NgForm;
  subcription: Subscription;
  editMode = false;
  editingItem: Ingredient;
  constructor(
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit(): void {
    this.subcription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editingItem = stateData.editedIngredient;
          this.formEdit.setValue({
            name: this.editingItem.name,
            amount: this.editingItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
    this.store.dispatch(new ShoppinListActions.StopEdit());
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    console.log(newIngredient);
    if (this.editMode) {
      this.store.dispatch(
        new ShoppinListActions.UpdateIngredient(newIngredient)
      );
    } else {
      this.store.dispatch(new ShoppinListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.editMode = false;
    this.formEdit.reset();
    this.store.dispatch(new ShoppinListActions.StopEdit());
  }
  onDelete() {
    this.store.dispatch(new ShoppinListActions.DeleteIngredient());
    this.editMode = false;
    this.formEdit.reset();
  }
}
