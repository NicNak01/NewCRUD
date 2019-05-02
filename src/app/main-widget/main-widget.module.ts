import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BodyModule } from '../body/body.module';
import { HeaderModule } from '../header/header.module';
import { MainWidgetComponent } from './main-widget.component';

@NgModule({
  declarations: [
    MainWidgetComponent
  ],
  imports: [
    CommonModule,
    BodyModule,
    HeaderModule
  ],
  exports: [
    CommonModule,
    MainWidgetComponent
  ]
})
export class MainWidgetModule { }
