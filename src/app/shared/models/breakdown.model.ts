import { IBicycle } from "./bicycle.model";
import { IStation } from "./station.model";

export interface IBreakdown{
    station: IStation;
    bicycles: IBicycle[];
}

export interface ISingleBreakdown{
    id: number;
    date: string;
    description: string;
    bicycleId: string;
    resolvedDate: string;
}