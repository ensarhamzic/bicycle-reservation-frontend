import { createReducer, on } from '@ngrx/store';
import { IUser } from 'src/app/shared/models/user.model';
import {
  login,
  register,
  authFailure,
  authSuccess,
  checkToken,
  logout,
} from './auth.actions';

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
    ime: '',
    prezime: '',
    username: '',
    email: '',
    role: null,
    verified: false,
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
        ime: '',
        prezime: '',
        username: '',
        email: '',
        role: null,
        verified: false,
      },
      token: '',
      loggedIn: false,
      error: null,
    };
  })
);
