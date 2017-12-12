import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { State, AppState, Action } from './types';
import {
  GET_CALENDAR_YEARLY,
  GET_ENTRY,
  POST_ENTRY,
  PUT_ENTRY,
  DELETE_ENTRY,
  SELECT_FILTER,
  SELECT_YEAR
} from './constants';

// TODO: remove hardcore data
export const initialState: State = {
  app: {
    days: [],
    filters: {
      metrics: 'sleepQuality',
      year: 2017
    }
  }
}

// reducer

export function homeReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case GET_CALENDAR_YEARLY:
      const days = {...state.days, ...action.payload};
      return {...state, days};
    case GET_ENTRY:
    case POST_ENTRY:
    case PUT_ENTRY:
    case DELETE_ENTRY:
    case SELECT_FILTER:
    case SELECT_YEAR:
    default: {
      return state;
    }
  }
}

