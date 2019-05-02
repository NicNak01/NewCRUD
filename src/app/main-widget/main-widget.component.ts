import { Component, OnInit } from '@angular/core';

import { ICarNumber } from '../shared/car-number';
import { WidgetService } from '../core/services/widget.service';

@Component({
  selector: 'app-main-widget',
  templateUrl: './main-widget.component.html',
  styleUrls: ['./main-widget.component.css']
})
export class MainWidgetComponent implements OnInit {
  constructor( private widgetService: WidgetService) { }
  ngOnInit() {
     this.widgetService.getCarNumbers().subscribe(
      (CarNumbers: ICarNumber[]) => {
        this.widgetService.setCarNumber(CarNumbers);
      }
    );
  }
}
