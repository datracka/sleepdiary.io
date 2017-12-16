import {NgModule} from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {MdlSelectModule} from '@angular2-mdl-ext/select';
import {MdlPopoverModule} from '@angular2-mdl-ext/popover';
import {FormsModule} from '@angular/forms';

import { CalendarEffects } from './calendar.effects';
import { CalendarForm } from './calendar.form/calendar-form.component';
import {calendarRouting} from './calendar.routes';
import {CalendarRenderMonthly} from './calendar.render.monthly';
import {MonthlyPageComponent} from './monthly.page/monthly.component';
import {YearlyPageComponent} from './yearly.page/yearly.component';
import {CalendarComponent} from './calendar';
import {AuthGuard} from '../services/common/auth-guard';
import {Month} from './calendar.render.monthly/month';
import {Week} from './calendar.render.monthly/week';
import {Day} from './calendar.render.monthly/day';
import {CloseMenuDirective} from '../services/common/close-menu.directive';

import {SharedModule} from '../shared/shared.module';
import {CalendarService} from '../services/calendar/calendar.service';
import { reducers } from './calendar.reducer';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        calendarRouting,
        MdlPopoverModule,
        MdlSelectModule,
       EffectsModule.forRoot([
          CalendarEffects
        ]),
        StoreModule.forFeature('calendar', reducers),
    ],
    declarations: [
        CalendarComponent,
        MonthlyPageComponent,
        YearlyPageComponent,
        CalendarRenderMonthly,
        CalendarForm,
        Month,
        Week,
        Day,
        CloseMenuDirective

    ],
    providers: [
        AuthGuard,
        // HomeEffects,
        CalendarService
    ]
})
export class CalendarModule {
}
