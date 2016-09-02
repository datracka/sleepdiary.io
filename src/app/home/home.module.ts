import {homeRouting} from "./home.routes";
import {NgModule} from "@angular/core";
import {Calendar} from "./calendar/calendar.component";
import {MonthlyViewComponent} from "./monthly/monthly.component";
import {EntryForm} from "./entryForm/entry-form.component";
import {YearlyViewComponent} from "./yearly/yearly.component";

@NgModule({
    imports: [
        homeRouting
    ],
    declarations: [
        Calendar,
        MonthlyViewComponent,
        EntryForm,
        YearlyViewComponent
    ],

    providers: [

    ]
})
export class HomerModule {}