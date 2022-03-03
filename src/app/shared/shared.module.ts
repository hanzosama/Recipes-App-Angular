import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';

@NgModule({
  declarations: [LoaderSpinnerComponent, AlertComponent, DropdownDirective],
  imports: [CommonModule],
  exports: [
    LoaderSpinnerComponent,
    AlertComponent,
    DropdownDirective,
    CommonModule,
  ],
})
export class SharedModule {}
