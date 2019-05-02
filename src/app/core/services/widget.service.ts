import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { ObservableStore } from '@codewithdan/observable-store';
import { CarnumbersStoreAction } from '../../shared/carnumbers-store-action';
import { StoreState } from '../../shared/store-state';
import { ICarNumber } from '../../shared/car-number';
@Injectable({
  providedIn: 'root'
})
export class WidgetService extends ObservableStore<StoreState> {
  url = 'http://localhost:8080/carnumbers';
  carNumbers: ICarNumber[];
  carNumber: ICarNumber;
  carNumbersSubject$ = new BehaviorSubject<ICarNumber[]>([]);
  carNumbersChanged$ = this.carNumbersSubject$.asObservable();
  constructor(private http: HttpClient) {
    super({ trackStateHistory: true });
  }

  getCarNumbers(): Observable<ICarNumber[]> {
    const state = this.getState();
    if (state && state.carnumbers) {
      console.log(this.stateHistory);
      return of(state.carnumbers);
    } else {
      console.log(this.stateHistory);
      return this.fetchCarnumbers().pipe(
              catchError(this.handleError)
            );
    }
  }

  createCarNumber(carNumber: ICarNumber): Observable<{}> {
    return this.http.post(this.url, carNumber).pipe(catchError(this.handleError));
  }

  addCarNumber(carNumber: ICarNumber): void {
    this.addstate(carNumber);
    const currentState = this.carNumbersSubject$.value.map(o => {
      return {...o};
    });
    const newCarNumbers = [...currentState, carNumber] as ICarNumber[];
    this.carNumbersSubject$.next(newCarNumbers);
  }

  removeCarNumber(num: string): void {
    const newCarNumbers = this.carNumbersSubject$.value.filter(value => value.number !== num) as ICarNumber[];
    this.carNumbersSubject$.next(newCarNumbers);
    this.deleteCarNumber(num).subscribe();
    this.removeState(num);
  }

  setCarNumber(carNumbers) {
    this.carNumbersSubject$.next(carNumbers);
   }

  private fetchCarnumbers(): Observable<ICarNumber[]>  {
    return this.http.get<ICarNumber[]>(this.url).pipe(
      map(carnumbers => {
        this.setState({ carnumbers }, CarnumbersStoreAction.getCarnumbers);
        return carnumbers;
      }),
      catchError(this.handleError)
    );
  }

  private removeState(num: string) {
    const state = this.getState();
    state.carnumbers.filter(value => value.number !== num);
    this.setState({ carnumbers: state.carnumbers }, CarnumbersStoreAction.removeCarnumbers);
  }

  private addstate(carNumber: ICarNumber) {
    const state = this.getState();
    state.carnumbers.push(carNumber);
    this.setState({ carnumbers: state.carnumbers }, CarnumbersStoreAction.addCarnumbers);
  }

  private handleError(err) {
  let errorMessage: string;
  if (err.error instanceof ErrorEvent) {
    errorMessage = `An error occurred: ${err.error.message}`;
  } else {
    errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
  }
  return throwError(errorMessage);
  }

  private deleteCarNumber(id: string): Observable<ICarNumber> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.url}/${id}`;
    return this.http.delete<ICarNumber>(url, { headers }).pipe(catchError(this.handleError));
  }

}
