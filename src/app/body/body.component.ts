import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { ICarNumber } from '../shared/car-number';
import { WidgetService } from '../core/services/widget.service';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, OnDestroy {
  carNumbers: ICarNumber[];
  sub: Subscription;

  constructor(private widgetService: WidgetService) { }
  deleteNumber(id: string): void {
    this.widgetService.removeCarNumber(id);
  }

  ngOnInit() {
    this.sub = this.widgetService.carNumbersChanged$.subscribe(carNumbers => this.carNumbers = carNumbers);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
