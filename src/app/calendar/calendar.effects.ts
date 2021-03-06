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
} from './calendar.constants';
import { CalendarState } from './calendar.reducer';
import { EntryFormService } from '../services/entry-form/entry-form.service';

@Injectable()
export class CalendarEffects {

  @Effect() navigateToHome = this.handleNavigation(ROUTE_CALENDAR_MONTHLY_PAGE, (r: ActivatedRouteSnapshot, state: any) => {
    /*
      To avoid race condition. Store is updated (insert / update / delete)
      and slightly before a getAll from Database is requested.

      Solution: if(|1| |2|) only request get all items when coming from login (1) or when
      reload (2)
    */
    if (r.paramMap.get('actionRef') === 'login' || state.routerReducer.navigationId === 1) {
      this.calendarService.getAll(state.calendar.filters.year)
        .map(response => ({ type: CALENDAR_ACTIONS.GET_YEARLY, payload: response.json() }))
        .subscribe((action) => {
          this.store.dispatch(action);
          return of();
        });
    }
    return of(); // to avoid console warning... nevertheles something is wrong...
  });

  @Effect() navigateToEntryForm = this.handleNavigation(ROUTE_ENTRY_FORM, (r: ActivatedRouteSnapshot, state: any) => {
    if (state.calendar.days.length <= 0 && r.paramMap.get('uuid') !== 'new') {
      this.calendarService.getAll(state.calendar.filters.year)
        .map(response => ({ type: CALENDAR_ACTIONS.GET_YEARLY, payload: response.json() }))
        .subscribe((action) => {
          this.store.dispatch(action);
          return of();
        });
    } // to avoid console warning... nevertheles something is wrong..
    return of();
  });

  @Effect() newEntry = this.actions.ofType(CALENDAR_ACTIONS.PUT_ENTRY)
    .switchMap((entry: any) => {
      return this.entryFormService.newEntry(entry.payload)
        .map(response => ({ type: CALENDAR_ACTIONS.INSERT_STORE, payload: response.json() }))
        .catch(e => {
          console.log('Error', e);
          return of(); // do nothing when fails
          // return of({ type: 'ROLLBACK_EXAMPLE', payload: {} }); // optimistic update
        });
    });

  @Effect() updateEntry = this.actions.ofType(CALENDAR_ACTIONS.POST_ENTRY)
    .switchMap((entry: any) => {
      return this.entryFormService.updateEntry(entry.payload)
        .map(response => ({ type: CALENDAR_ACTIONS.UPDATE_STORE, payload: response.json() }))
        .catch(e => {
          console.log('Error', e);
          return of(); // do nothing when fails
          // return of({ type: 'ROLLBACK_EXAMPLE', payload: {} }); // optimistic update
        });
    });

  @Effect() deleteEntry = this.actions.ofType(CALENDAR_ACTIONS.DELETE_ENTRY)
    .switchMap((entry: any) => {
      return this.entryFormService.deleteEntry(entry.payload)
        .switchMap(() => of())
        .catch(e => {
          console.log('Error', e);
          return of(); // do nothing when fails
          // return of({ type: 'ROLLBACK_EXAMPLE', payload: {} }); // optimistic update
        });
    });

  @Effect() getEntries = this.actions.ofType(CALENDAR_ACTIONS.SELECT_YEAR)
    .switchMap((entry: any) => {
      return this.calendarService.getAll(entry.payload)
        .map(response => ({ type: CALENDAR_ACTIONS.GET_YEARLY, payload: response.json() }))
        .catch(e => {
          console.log('Error', e);
          return of(); // do nothing when fails
          // return of({ type: 'ROLLBACK_EXAMPLE', payload: {} }); // optimistic update
        });
    });


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
        return s ? s.routeConfig.path === segment : false;
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
