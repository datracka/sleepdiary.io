import {homeRouting} from "./home.routes";
import {NgModule} from "@angular/core";
import {Calendar} from "./calendar/calendar.component";
import {MonthlyViewComponent} from "./monthly/monthly.component";
import {EntryForm} from "./entryForm/entry-form.component";
import {YearlyViewComponent} from "./yearly/yearly.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HomeComponent} from "./home";
import {Header} from "../header/header";
import {Footer} from "../footer/footer";
import {AuthGuard} from "../shared/common/auth-guard";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        homeRouting
    ],
    declarations: [
        HomeComponent,
        MonthlyViewComponent,
        YearlyViewComponent,
        Calendar,
        EntryForm,
        Header,
        Footer
    ],
    providers: [
        AuthGuard
    ]
})
export class HomeModule {}