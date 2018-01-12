import { RouterAction } from '@ngrx/router-store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import {
  CALENDAR_ACTIONS
} from './calendar.constants';

// types

export type Day = {
  uuid: number,
  user: number,
  sleepingQuality: String,
  tirednessFeeling: String
};

export type Filters = {
  metric: String | {},
  year: number
};

export type CalendarState = {
  days: Array<Day>,
  filters: Filters
};

export type GetCalendarByYear = { type: '[CALENDAR] GET_YEARLY', payload: {} };
export type GetEntry = { type: '[CALENDAR] GET_ENTRY', payload: {} };
export type PostEntry = { type: '[CALENDAR] POST_ENTRY', payload: {} };
export type PutEntry = { type: '[CALENDAR] PUT_ENTRY', payload: {} };
export type DeleteEntry = { type: '[CALENDAR] DELETE_ENTRY', payload: {} };
export type SelectMetric = { type: '[CALENDAR] SELECT_METRIC', payload: string };
export type SelectYear = { type: '[CALENDAR] SELECT_YEAR', payload: number };
export type Action = RouterAction<CalendarState> |
  GetCalendarByYear |
  GetEntry | PostEntry | PutEntry | DeleteEntry | SelectMetric | SelectYear;


// InititalState
// TODO: remove hardcore data
export const calendarInitialState: CalendarState = {
  days: [],
  filters: {
    metric: 'sleepQuality',
    year: 2017
  }
};

// reducer

export default function calendarReducer(state: CalendarState = calendarInitialState, action: Action): CalendarState {
  switch (action.type) {
    case CALENDAR_ACTIONS.GET_YEARLY:
      const days = { ...state.days, ...action.payload };
      return { ...state, days };
    case CALENDAR_ACTIONS.GET_ENTRY:
    case CALENDAR_ACTIONS.POST_ENTRY:
    case CALENDAR_ACTIONS.PUT_ENTRY:
    case CALENDAR_ACTIONS.DELETE_ENTRY:
    case CALENDAR_ACTIONS.SELECT_METRIC:
      return {
        ...state,
        filters: {
          ...state.filters,
          metric: action.payload
        }
      };
    case CALENDAR_ACTIONS.SELECT_YEAR:
      return {
        ...state,
        filters: {
          ...state.filters,
          year: action.payload
        }
      };
    default: {
      return state;
    }
  }
}

// selectors

export const getCalendarState = createFeatureSelector<CalendarState>('calendar');
export const getDays = (state: CalendarState) => state.days;
export const getCalendarDays = createSelector(
  getCalendarState,
  getDays,
);
export const getFilters = (state: CalendarState) => state.filters;

export const getCalendarFilters = createSelector(
  getCalendarState,
  getFilters
);




