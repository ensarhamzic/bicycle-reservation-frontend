import { createAction, props } from '@ngrx/store';
import { IAuth } from 'src/app/shared/models/auth.model';

export const register = createAction('[Auth] Register', props<{ user: any }>());
export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
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

export const verify = createAction(
  '[Auth] Verify',
  props<{ token: string; email: string }>()
);

export const forgotPasswordEmail = createAction(
  '[Auth] Forgot Password Email',
  props<{ email: string }>()
);

export const forgotPasswordEmailSuccess = createAction(
  '[Auth] Forgot Password Email Success',
  props<{ message: string }>()
);

export const forgotPasswordEmailFailure = createAction(
  '[Auth] Forgot Password Email Failure',
  props<{ error: string }>()
);

export const forgotPasswordReset = createAction(
  '[Auth] Reset Password',
  props<{ token: string; password: string; email: string }>()
);

export const resendVerifyEmail = createAction(
  '[Auth] Resend Verify Email',
  props<{ email: string }>()
);

export const logout = createAction('[Auth] Logout');
