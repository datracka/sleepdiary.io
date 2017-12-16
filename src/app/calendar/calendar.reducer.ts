import { RouterAction } from '@ngrx/router-store';
import {
  GET_CALENDAR_YEARLY,
  GET_ENTRY,
  POST_ENTRY,
  PUT_ENTRY,
  DELETE_ENTRY,
  SELECT_FILTER,
  SELECT_YEAR
} from './calendar.constants';

export type Day = {
  uuid: number,
  user: number,
  sleepingQuality: String,
  tirednessFeeling: String
};

export type Filters = {
  metrics: String,
  year: number
};

export type CalendarState = {
  days: Array<Day>,
  filters: Filters
};

export type GetCalendarByYear = { type: 'GET_CALENDAR_YEARLY', payload: {} }
export type GetEntry = { type: 'GET_ENTRY', payload: {} }
export type PostEntry = { type: 'POST_ENTRY', payload: {} }
export type PutEntry = { type: 'PUT_ENTRY', payload: {} }
export type DeleteEntry = { type: 'DELETE_ENTRY', payload: {} }
export type SelectFilter = { type: 'SELECT_FILTER', payload: {} }
export type SelectYear = { type: 'SELECT_YEAR', payload: {} }
export type Action = RouterAction<CalendarState> |
GetCalendarByYear |
GetEntry | PostEntry | PutEntry | DeleteEntry | SelectFilter | SelectYear;


// TODO: remove hardcore data
export const calendarInitialState: CalendarState = {
    days: [],
    filters: {
      metrics: 'sleepQuality',
      year: 2017
    }
};

// reducer

export function calendarReducer(state: CalendarState, action: Action): CalendarState {
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
    break;
    default: {
      return state;
    }
  }
}

export const reducers = {
  calendare: calendarReducer
};
