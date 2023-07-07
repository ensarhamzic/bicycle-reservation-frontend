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

export const changeUsername = createAction(
  '[Auth] Change Username',
  props<{ username: string }>()
);

export const changePassword = createAction(
  '[Auth] Change Password',
  props<{ oldPassword: string; newPassword: string }>()
);

export const deleteAcc = createAction(
  '[Auth] Delete Account',
  props<{ password: string }>()
);

export const uploadImage = createAction(
  '[Auth] Upload Image',
  props<{ image: any }>()
);

export const deposit = createAction(
  '[Auth] Deposit',
  props<{ amount: number }>()
);

export const googleAuth = createAction(
  '[Auth] GoogleAuth',
  props<{ user: any }>()
);

export const deleteImage = createAction('[Auth] Delete Image');

export const logout = createAction('[Auth] Logout');
