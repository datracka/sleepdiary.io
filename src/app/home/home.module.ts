import { CalendarForm } from './calendar/calendarForm/calendar-form.component';
import {homeRouting} from "./home.routes";
import {NgModule} from "@angular/core";
import {Calendar} from "./calendar/calendar.component";
import {MonthlyViewComponent} from "./monthly/monthly.component";
import {EntryForm} from "./entryForm/entry-form.component";
import {YearlyViewComponent} from "./yearly/yearly.component";
import {FormsModule} from "@angular/forms";
import {HomeComponent} from "./home";
import {AuthGuard} from "../services/common/auth-guard";
import {Month} from "./calendar/month";
import {Week} from "./calendar/week";
import {Day} from "./calendar/day";
import {CloseMenuDirective} from "../services/common/close-menu.directive";
import {MdlSelectModule} from "@angular2-mdl-ext/select";
import {MdlPopoverModule} from "@angular2-mdl-ext/popover";
import {SharedModule} from "../shared/shared.module";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { EffectsModule } from "@ngrx/effects";
import { appReducer, initialState, State, HomeEffects } from './model';
import { StoreModule } from '@ngrx/store';


@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        homeRouting,
        MdlPopoverModule,
        MdlSelectModule,
        StoreRouterConnectingModule,
        EffectsModule.forRoot([
          HomeEffects
        ]),
        StoreModule.forRoot(<any>{app: appReducer}, {initialState}),
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
        AuthGuard
    ]
})
export class HomeModule {
}
