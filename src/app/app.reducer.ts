import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { storeFreeze } from 'ngrx-store-freeze';
import { CustomRouterStateSerializer as RouterStateUrl } from './utils/custom-router-serializer';

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer,
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = process.env.ENVIRONMENT !== 'prod'
  ? [logger, storeFreeze]
  : [];


/* export type AppState = {
  calendar: CalendarState
};

export const appReducer = {
  calendar: calendarReducer
};

export const initialState = {
  calendar: calendarInitialState
}; */


