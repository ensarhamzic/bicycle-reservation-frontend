import { createReducer, on } from '@ngrx/store';
import { IUser } from 'src/app/shared/models/user.model';
import {
  login,
  register,
  authFailure,
  authSuccess,
  checkToken,
  logout,
  verify,
  forgotPasswordEmail,
  forgotPasswordEmailSuccess,
  forgotPasswordEmailFailure,
  forgotPasswordReset,
  resendVerifyEmail,
  changeUsername,
  changePassword,
  uploadImage,
  deleteImage,
  deleteAcc,
  deposit,
} from './auth.actions';
import { state } from '@angular/animations';
import { rentBicycleSuccess } from '../user/user.actions';

export interface AuthState {
  loading: boolean;
  user: IUser;
  token: string;
  loggedIn: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  loading: false,
  user: {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    imageUrl: null,
    role: null,
    verified: false,
    credits: 0,
  },
  token: '',
  loggedIn: !!localStorage.getItem('token'),
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(register, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(login, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(authSuccess, (state, { data }) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.user.role || '');
    return {
      ...state,
      loading: false,
      user: data.user,
      token: data.token,
      loggedIn: true,
      error: null,
    };
  }),

  on(authFailure, (state, { error }) => {
    console.log(error);
    return {
      ...state,
      loading: false,
      error,
    };
  }),

  on(checkToken, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(logout, (state) => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    return {
      ...state,
      loading: false,
      user: {
        id: 0,
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        role: null,
        imageUrl: null,
        verified: false,
        credits: 0,
      },
      token: '',
      loggedIn: false,
      error: null,
    };
  }),

  on(verify, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(forgotPasswordEmail, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(forgotPasswordEmailSuccess, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),

  on(forgotPasswordEmailFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),

  on(forgotPasswordReset, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(resendVerifyEmail, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(changeUsername, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(changePassword, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(uploadImage, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(deleteImage, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(deleteAcc, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(deposit, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(rentBicycleSuccess, (state, { balance }) => {
    return {
      ...state,
      user: {
        ...state.user,
        credits: balance,
      },
    };
  })
);
