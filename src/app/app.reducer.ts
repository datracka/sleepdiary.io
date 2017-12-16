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

export const metaReducers: MetaReducer<State>[] = process.env.ENVIRONMENT !== 'prod'
? [storeFreeze]
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


