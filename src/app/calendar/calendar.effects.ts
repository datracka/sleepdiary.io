import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mapTo';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { CalendarService } from '../services/calendar/calendar.service';
import {
  ROUTE_CALENDAR_MONTHLY_PAGE,
  ROUTE_ENTRY_FORM,
  CALENDAR_ACTIONS,
  GET_ENTRY,
  POST_ENTRY,
  PUT_ENTRY,
  DELETE_ENTRY
} from './calendar.constants';
import { CalendarState } from './calendar.reducer';
import { Entry } from '../services/common/entry';
import { EntryFormService } from '../services/entry-form/entry-form.service';
import { CALENDAR_ACTIONS } from './calendar.constants';
import { Action, GetEntry } from './calendar.reducer';


// TODO:
// state <any>
// params instead 2017
// (pre)append & (post)append LOADING status Action
@Injectable()
export class CalendarEffects {

  @Effect() navigateToHome = this.handleNavigation(ROUTE_CALENDAR_MONTHLY_PAGE, (r: ActivatedRouteSnapshot, state: any) => {
    this.calendarService.getAll('2018') // ,-- refactor it : param should be in url!!! /calendar/monthly/2018
      .map(response => ({ type: CALENDAR_ACTIONS.GET_YEARLY, payload: response.json() }))
      .subscribe((action) => {
        this.store.dispatch(action);
        return of();
      });
    return of(); // to avoid console warning... nevertheles something is wrong...
  });

  @Effect() navigateToEntryForm = this.handleNavigation(ROUTE_ENTRY_FORM, (r: ActivatedRouteSnapshot, state: any) => {
    this.entryFormService.getEntry(r.paramMap.get('uuid'))
      .map(response => ({ type: CALENDAR_ACTIONS.GET_ENTRY, payload: response.json() }))
      .subscribe(action => {
        this.store.dispatch(action);
        return of();
      });
    return of();
  });
  /*   @Effect() getEntry = this.actions.ofType(CALENDAR_ACTIONS.GET_ENTRY)
      .switchMap((action: GetEntry) => {
        return this.entryFormService.getEntry(action.payload);
      })
      .map(response => ({ type: CALENDAR_ACTIONS.GET_YEARLY, payload: response.json() }))
      .catch(e => {
        console.log('Error', e);
        return of();
      }); */
  /* maybe move this effects to his own file ... */
  /*   @Effect() newEntry = this.actions.ofType(GET_ENTRY)
      .switchMap((entry: any) => {
        return this.entryFormService.newEntry(entry)
          .switchMap(() => of()). // do nothing when it succeeds
          catch(e => {
            console.log('Error', e);
            return of({ type: 'ROLLBACK_EXAMPLE', payload: {} }); // example. Here (get) no useful!
          });
      });
    @Effect() updateEntry = undefined;
    @Effect() deleteEntry = undefined; */

  constructor(private actions: Actions,
    private store: Store<CalendarState>,
    public calendarService: CalendarService,
    public entryFormService: EntryFormService) {
  }

  private handleNavigation(
    segment: string,
    callback: (a: ActivatedRouteSnapshot, state: any) => Observable<any>
  ) {
    const nav = this.actions
      .ofType(ROUTER_NAVIGATION)
      .map(firstSegment)
      .filter(s => {
        return s.routeConfig.path === segment;
      });

    return nav
      .withLatestFrom(this.store)
      .switchMap(a => callback(a[0], a[1]))
      .catch(e => {
        console.log('Network error', e);
        return of();
      });
  }
}

// helpers
function firstSegment(r: RouterNavigationAction) {
  return r.payload.routerState.root.children[0].children[0].children[0];
}
