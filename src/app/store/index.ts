// src/app/store/index.ts
import { ActionReducerMap } from '@ngrx/store';
import { userReducer, UserState } from './user.reducer';

export interface AppState {
  users: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  users: userReducer,
};
