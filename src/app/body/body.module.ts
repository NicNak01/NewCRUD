import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body.component';
import { SahredModule } from '../shared/sahred.module';

@NgModule({
  declarations: [
    BodyComponent
  ],
  imports: [
    CommonModule,
    SahredModule
  ],
  exports: [
    BodyComponent
  ]
})
export class BodyModule { }
