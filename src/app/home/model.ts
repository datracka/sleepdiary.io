import { Injectable } from '@angular/core';
import { RouterAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";

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

// actions
export type GetCalendarByYear = { type: 'GET_CALENDAR_YEARLY', payload: {} }
export type GetEntry = { type: 'GET_ENTRY', payload: {} }
export type PostEntry = { type: 'POST_ENTRY', payload: {} }
export type PutEntry = { type: 'PUT_ENTRY', payload: {} }
export type DeleteEntry = { type: 'DELETE_ENTRY', payload: {} }
export type SelectFilter = { type: 'SELECT_FILTER', payload: {} }
export type SeleectYear = { type: 'SELECT_YEAR', payload: {} }
export type Action = RouterAction<State> | GetCalendarByYear | GetEntry | PostEntry | PutEntry | DeleteEntry | SelectFilter | SeleectYear

// reducer

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
@Injectable()
export class HomeEffects {
  @Effect() navigateToHome = this.handleNavigation('quemierdaesestodesegment', (r: ActivatedRouteSnapshot) => {
      return null; // temporal
   });


  private handleNavigation(segment: string, callback: (a: ActivatedRouteSnapshot, state: State) => Observable<any>) {
    console.log('###', this.actions);
  }
  constructor(private actions: Actions, private store: Store<State>) {
  }


}

