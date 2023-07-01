import { createAction, props } from '@ngrx/store';
import { IAuth } from 'src/app/shared/models/auth.model';

export const register = createAction('[Auth] Register', props<{ user: any }>());
export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);

export const authSuccess = createAction(
  '[Auth] Auth Success',
  props<{ data: IAuth }>()
);

export const authFailure = createAction(
  '[Auth] Auth Failure',
  props<{ error: string }>()
);

export const checkToken = createAction(
  '[Auth] Check Token',
  props<{ token: string }>()
);

export const logout = createAction('[Auth] Logout');
