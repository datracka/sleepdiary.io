import {NgModule} from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {MdlSelectModule} from '@angular2-mdl-ext/select';
import {MdlPopoverModule} from '@angular2-mdl-ext/popover';
import {FormsModule} from '@angular/forms';

import { HomeEffects } from './home.effects';
import { CalendarForm } from './calendar/calendarForm/calendar-form.component';
import {homeRouting} from './home.routes';
import {Calendar} from './calendar/calendar.component';
import {EntryForm} from './entryForm/entry-form.component';
import {MonthlyViewComponent} from './monthly/monthly.component';
import {YearlyViewComponent} from './yearly/yearly.component';
import {HomeComponent} from './home';
import {AuthGuard} from '../services/common/auth-guard';
import {Month} from './calendar/month';
import {Week} from './calendar/week';
import {Day} from './calendar/day';
import {CloseMenuDirective} from '../services/common/close-menu.directive';

import {SharedModule} from '../shared/shared.module';
import {CalendarService} from '../services/calendar/calendar.service';
import { calendarReducer } from './calendar/calendar.reducer';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        homeRouting,
        MdlPopoverModule,
        MdlSelectModule,
       /*  EffectsModule.forRoot([
          HomeEffects
        ]), */
        // StoreModule.forFeature('calendar', calendarReducer),
    ],
    declarations: [
        HomeComponent,
        MonthlyViewComponent,
        YearlyViewComponent,
        EntryForm,
        Calendar,
        CalendarForm,
        Month,
        Week,
        Day,
        CloseMenuDirective

    ],
    providers: [
        AuthGuard,
        HomeEffects,
        CalendarService
    ]
})
export class HomeModule {
}
