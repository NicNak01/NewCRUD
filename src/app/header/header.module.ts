import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SahredModule } from '../shared/sahred.module';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SahredModule
  ],
  exports: [
    HeaderComponent,
    ReactiveFormsModule
  ]
})
export class HeaderModule { }
