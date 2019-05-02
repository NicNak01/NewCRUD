import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyComponent } from './body.component';
import { CarNumberPlate } from '../shared/car-number-plate.pipe';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { ICarNumber } from '../shared/car-number';

import { CommonModule } from '@angular/common';
import { SahredModule } from '../shared/sahred.module';
import { WidgetService } from '../core/services/widget.service';


describe('BodyComponent', () => {
  let component: BodyComponent;
  let fixture: ComponentFixture<BodyComponent>;
  let carNums: ICarNumber[];
  let carNumber: ICarNumber;
  let widgetService: WidgetService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BodyComponent],
      imports: [
        HttpClientTestingModule,
        CommonModule,
       SahredModule
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    carNums = [
      { number: 'car111', owner: 'John1' },
      { number: 'car112', owner: 'John2' },
      { number: 'car113', owner: 'John3' }
    ];
    carNumber = { number: 'car111', owner: 'John1' };
    fixture = TestBed.createComponent(BodyComponent);
    component = fixture.componentInstance;
    widgetService = TestBed.get(WidgetService);
    fixture.detectChanges();
  });
  it('should create one td for each car number', () => {
    component.carNumbers = carNums;
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('tr')).length).toBe(4);
  });
  describe('delete car number', () => {
    // it('should remove car number from car number list', () => {
    //   component.carNumbers = carNums;
    //   widgetService.carNumbersSubject$.next(carNums);
    //   fixture.detectChanges();
    //   component.deleteNumber(carNumber.number);
    //   expect(component.carNumbers).toEqual(component.carNumbers.filter(value => value.number !== carNumber.number));
    // });

    it('should call car remove car number', () => {
      const spy = spyOn(widgetService, 'removeCarNumber');
      widgetService.carNumbersSubject$.next(carNums);
      component.carNumbers = carNums;
      fixture.detectChanges();
      component.deleteNumber(carNumber.number);

      expect(spy).toHaveBeenCalledWith(carNumber.number);
    });
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
