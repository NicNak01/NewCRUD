import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ICarNumber } from '../shared/car-number';
import { carNumberMatcher } from '../core/car-number-matcher';
import { WidgetService } from '../core/services/widget.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  carNumbers: ICarNumber[];
  existence = false;
  carNumberForm: FormGroup = this.fb.group({
    number: ['', [Validators.required, carNumberMatcher]],
    owner: ['', [Validators.required, Validators.minLength(1)]]
  });
  carNum: string;
  sub: Subscription;
  carNumber: any;

  constructor(private fb: FormBuilder,
              private widgetService: WidgetService) { }
  saveCarNumeber() {
    this.existence = false;
    this.carNumber = Object.assign({}, this.carNumberForm.value );
    this.carNumberForm.reset();
    this.carNumbers.forEach(element => {
      if (element.number === this.carNumber.number) {
        this.carNum = this.carNumber.number;
        this.existence = true;
      } else {
      }
    });
    if (!this.existence) {
      this.widgetService.addCarNumber(this.carNumber);
      this.widgetService.createCarNumber(this.carNumber).subscribe();
      this.carNum = null;
    }
  }
  ngOnInit() {
    this.sub = this.widgetService.carNumbersChanged$.subscribe(carNumbers => this.carNumbers = carNumbers);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}




