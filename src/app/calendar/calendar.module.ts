import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

import { EntryForm } from './entry-form';
import { CalendarEffects } from './calendar.effects';
import { CalendarForm } from './calendar.form/calendar-form.component';
import { calendarRouting } from './calendar.routes';
import { CalendarRenderMonthly } from './calendar.render.monthly';
import { MonthlyPageComponent } from './monthly.page/monthly.component';
import { YearlyPageComponent } from './yearly.page/yearly.component';
import { CalendarComponent } from './calendar';
import { AuthGuard } from '../services/common/auth-guard';
import { Month } from './calendar.render.monthly/month';
import { Week } from './calendar.render.monthly/week';
import { Day } from './calendar.render.monthly/day';
import { CloseMenuDirective } from '../services/common/close-menu.directive';

import { SharedModule } from '../shared/shared.module';
import { CalendarService } from '../services/calendar/calendar.service';
import calendarReducer from './calendar.reducer';
import { EntryFormService } from '../services/entry-form/entry-form.service';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    calendarRouting,
    EffectsModule.forRoot([
      CalendarEffects
    ]),
    StoreModule.forFeature('calendar', calendarReducer),
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
    CloseMenuDirective,
    EntryForm
  ],
  providers: [
    AuthGuard,
    CalendarService,
    EntryFormService
  ]
})
export class CalendarModule {
}
