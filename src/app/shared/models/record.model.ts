import { IBicycle } from './bicycle.model';
import { IStation } from './station.model';

export interface IRecord {
  id: number;
  bicycle: IBicycle;
  startStation: IStation;
  endStation: IStation;
  numberOfHours: number;
  startDate: Date;
  costPerHour: number;
}
