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
import { ROUTE_CALENDAR_MONTHLY_PAGE } from './calendar.constants';

// TODO:
// state <any>
// params instead 2017
@Injectable()
export class CalendarEffects {
  @Effect() navigateToHome = this.handleNavigation(ROUTE_CALENDAR_MONTHLY_PAGE, (r: ActivatedRouteSnapshot) => {
    this.calendarService.getAll('2017')
      .map(response => ({ type: 'GET_CALENDAR_YEARLY', payload: response.json() }))
      .subscribe((action) => {
        this.store.dispatch(action);
      });
    return null;
  });

  constructor(private actions: Actions, private store: Store<any>, public calendarService: CalendarService) {
  }

  private handleNavigation(segment: string, callback: (a: ActivatedRouteSnapshot, state: any) => Observable<any>) {
    const nav = this.actions.ofType(ROUTER_NAVIGATION).
      map(firstSegment).
      filter(s => {
        return s.url.includes(segment);
      });

    return nav.withLatestFrom(this.store)
      .switchMap(a => {
        return callback(a[0], a[1]);
      })
      .catch(e => {
        console.log('Network error', e);
        return of();
      });
  }
}

// helpers
function firstSegment(r: RouterNavigationAction) {
  return r.payload.routerState;
}
