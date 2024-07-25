// src/app/store/user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { loadUsersSuccess, loadUsersFailure, loadUserSuccess, loadUserFailure } from './user.actions';
import { User } from '../models/user.model';

export interface UserState {
  users: User[];
  selectedUser: User | null;
  error: string | null;
}

export const initialState: UserState = {
  users: [],
  selectedUser: null,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => ({ ...state, users })),
  on(loadUsersFailure, (state, { error }) => ({ ...state, error })),
  on(loadUserSuccess, (state, { user }) => ({ ...state, selectedUser: user })),
  on(loadUserFailure, (state, { error }) => ({ ...state, error }))
);
