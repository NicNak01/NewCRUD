import { ICarNumber } from './car-number';

export interface StoreState {
  carnumbers: ICarNumber[];
  carnumber: ICarNumber;
}
