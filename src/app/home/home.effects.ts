import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { ActivatedRouteSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import "rxjs/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/withLatestFrom";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";
import 'rxjs/add/operator/mapTo'
import { of } from "rxjs/observable/of";
import { Observable } from "rxjs/Observable";
import { State, GetCalendarByYear } from '../model';
import { CalendarService } from '../services/calendar/calendar.service'


@Injectable()
export class HomeEffects {
  @Effect() navigateToHome = this.handleNavigation('/home/monthly', (r: ActivatedRouteSnapshot) => {
    this.calendarService.getAll('2017')
    .mapTo({type: 'GET_CALENDAR_YEARLY', payload: 'payload'})
    .subscribe((action)=>{
      this.store.dispatch(action)
  });
    return null;
  });

  constructor(private actions: Actions, private store: Store<State>, public calendarService: CalendarService) {
  }

  private handleNavigation(segment: string, callback: (a: ActivatedRouteSnapshot, state: State) => Observable<any>) {
    const nav = this.actions.ofType(ROUTER_NAVIGATION).
      map(firstSegment).
      filter(s => {
        return s.url === segment
      });

    return nav.withLatestFrom(this.store)
      .switchMap(a => {
        return callback(a[0], a[1])
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
