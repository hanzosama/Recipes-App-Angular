import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: [],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput') amountInput: ElementRef<HTMLInputElement>;

  constructor(private shoppingService:ShoppingService) {}

  ngOnInit(): void {}

  onAddItem() {
    const ingName = this.nameInput.nativeElement.value;
    const ingAmount = +this.amountInput.nativeElement.value;
    const newIngredient = new Ingredient(ingName,ingAmount)
    console.log(newIngredient);
    this.shoppingService.addIngredient(newIngredient);
  }
}
