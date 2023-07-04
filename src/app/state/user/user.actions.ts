import { createAction, props } from '@ngrx/store';

export const rentBicycleSuccess = createAction('[User] Rent Bicycle Success', props<{ balance: number }>());