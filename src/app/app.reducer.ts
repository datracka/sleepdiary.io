import { calendarReducer, calendarInitialState, CalendarState } from './home/calendar/calendar.reducer';

// state

export type AppState = {
  calendar: CalendarState
};

export const appReducer = {
  calendar: calendarReducer
};

export const initialState = {
  calendar: calendarInitialState
};


