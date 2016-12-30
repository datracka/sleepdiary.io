import {homeRouting} from "./home.routes";
import {NgModule} from "@angular/core";
import {Calendar} from "./calendar/calendar.component";
import {MonthlyViewComponent} from "./monthly/monthly.component";
import {EntryForm} from "./entryForm/entry-form.component";
import {YearlyViewComponent} from "./yearly/yearly.component";
import {FormsModule} from "@angular/forms";
import {HomeComponent} from "./home";
import {AuthGuard} from "../services/common/auth-guard";

import {CloseMenuDirective} from "../services/common/close-menu.directive";
import {MdlSelectModule} from "@angular2-mdl-ext/select";
import {MdlPopoverModule} from "@angular2-mdl-ext/popover";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        homeRouting,
        MdlPopoverModule,
        MdlSelectModule
    ],
    declarations: [
        HomeComponent,
        MonthlyViewComponent,
        YearlyViewComponent,
        EntryForm,
        Calendar,
        CloseMenuDirective

    ],
    providers: [
        AuthGuard
    ]
})
export class HomeModule {
}