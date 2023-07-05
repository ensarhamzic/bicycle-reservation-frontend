import { ISingleBreakdown } from "./breakdown.model";

export interface IBicycle {
  id: string;
  name: string;
  lockCode: string;
  type: string;
  breakdowns: ISingleBreakdown[];
}
