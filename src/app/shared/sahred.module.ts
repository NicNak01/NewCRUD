import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarNumberPlate } from './car-number-plate.pipe';

@NgModule({
  declarations: [
    CarNumberPlate
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CarNumberPlate
  ]
})
export class SahredModule { }
