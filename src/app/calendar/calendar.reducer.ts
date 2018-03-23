import { RouterAction } from '@ngrx/router-store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import {
  CALENDAR_ACTIONS
} from './calendar.constants';
import { MetricsIndicators } from '../services/common/metrics-indicators';
// types

// Entry and Day are 2 model structure for the
export type Day = {
  id: number,
  uuid: string,
  date: string,
  user: number,
  sleepingQuality: string,
  tirednessFeeling: string
};

export type Filters = {
  metric: string | {},
  year: number
};

export type CalendarState = {
  days: Array<Day>,
  filters: Filters
};

export type GetCalendarByYear = { type: '[CALENDAR] GET_YEARLY', payload: Array<Day> };
export type GetEntry = { type: '[CALENDAR] GET_ENTRY', payload: Day };
export type PostEntry = { type: '[CALENDAR] POST_ENTRY', payload: {} };
export type PutEntry = { type: '[CALENDAR] PUT_ENTRY', payload: Day };
export type InsertStore = { type: '[CALENDAR] INSERT_STORE', payload: Day };
export type UpdateStore = { type: '[CALENDAR] UPDATE_STORE', payload: Day };
export type DeleteEntry = { type: '[CALENDAR] DELETE_ENTRY', payload: string };
export type SelectMetric = { type: '[CALENDAR] SELECT_METRIC', payload: string };
export type SelectYear = { type: '[CALENDAR] SELECT_YEAR', payload: number };
export type Action = RouterAction<CalendarState> |
  GetCalendarByYear |
  GetEntry | PostEntry | PutEntry | DeleteEntry | SelectMetric | SelectYear | InsertStore | UpdateStore;


// InititalState
// TODO: remove hardcore data
export const calendarInitialState: CalendarState = {
  days: [],
  filters: {
    metric: MetricsIndicators.SLEEPING_QUALITY,
    year: 2018
  }
};

// reducer

export default function calendarReducer(state: CalendarState = calendarInitialState, action: Action): CalendarState {
  switch (action.type) {
    case CALENDAR_ACTIONS.GET_YEARLY:
      return {
        ...state,
        days: action.payload
      };
    case CALENDAR_ACTIONS.GET_ENTRY:
      // not used
      return state;
    case CALENDAR_ACTIONS.POST_ENTRY:
      // noy used
      return state;
    case CALENDAR_ACTIONS.INSERT_STORE:
      let newDays = state.days.slice();
      newDays.splice(newDays.length, 0, action.payload);
      return {
        ...state,
        days: newDays
      };
    case CALENDAR_ACTIONS.UPDATE_STORE:
      const a = state.days.map(day => {
        if (day.uuid !== action.payload.uuid) {
          return day;
        }

        return {
          ...day,
          ...action.payload
        };
      });
      return {
        ...state,
        days: a
      };
    case CALENDAR_ACTIONS.DELETE_ENTRY:
      const newDeletedDays = state.days.filter(day => {
        return day.uuid !== action.payload;
      });
      const newDeletedState = {
        ...state,
        days: newDeletedDays
      };
      return newDeletedState;

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
export const getFiltersState = createFeatureSelector<Filters>('filters');

export const getDays = (state: CalendarState) => state.days;
export const getFilters = (state: CalendarState) => state.filters;

export const getCalendarDays = createSelector(
  getCalendarState,
  getDays,
);

export const getCalendarFilters = createSelector(
  getCalendarState,
  getFilters
);

export const getFilterYear = createSelector(getCalendarFilters, (state: Filters) => state.year);
export const getFilterMetric = createSelector(getCalendarFilters, (state: Filters) => state.metric);




