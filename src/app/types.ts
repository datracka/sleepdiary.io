import { RouterAction } from '@ngrx/router-store';

// state

export type AppState = {
  days: Array<Day>,
  filters: Filters
}

export type Day = {
  uuid: number,
  user: number,
  sleepingQuality: String,
  tirednessFeeling: String
}

export type Filters = {
  metrics: String,
  year: number
}

export type State = { app: AppState }; // this will also contain router state

// home actions

export type GetCalendarByYear = { type: 'GET_CALENDAR_YEARLY', payload: {} }
export type GetEntry = { type: 'GET_ENTRY', payload: {} }
export type PostEntry = { type: 'POST_ENTRY', payload: {} }
export type PutEntry = { type: 'PUT_ENTRY', payload: {} }
export type DeleteEntry = { type: 'DELETE_ENTRY', payload: {} }
export type SelectFilter = { type: 'SELECT_FILTER', payload: {} }
export type SeleectYear = { type: 'SELECT_YEAR', payload: {} }
export type Action = RouterAction<State> | GetCalendarByYear | GetEntry | PostEntry | PutEntry | DeleteEntry | SelectFilter | SeleectYear
