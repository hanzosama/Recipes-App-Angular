import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: [],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('formEdit') formEdit: NgForm;
  subcription: Subscription;
  editMode = false;
  editingIndexItem: number;
  editingItem: Ingredient;
  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.subcription = this.shoppingService.startingEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editingIndexItem = index;
        this.editingItem = this.shoppingService.getIngridient(index);
        this.formEdit.setValue({
          name: this.editingItem.name,
          amount: this.editingItem.amount,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    console.log(newIngredient);
    if (this.editMode) {
      this.shoppingService.updateIngredient(
        this.editingIndexItem,
        newIngredient
      );
    } else {
      this.shoppingService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.editMode = false;
    this.formEdit.reset();
  }
  onDelete(){
    this.shoppingService.removeIngredient(this.editingIndexItem);
    this.editMode = false;
    this.formEdit.reset();
  }
}
