import {NgModule} from "@angular/core";
import {statisticsRouting} from "./statistics.routes";
import {StatisticsComponent} from "./statistics";
import {SampleComponent} from "./sample/sample.component";
import {AuthGuard} from "../services/common/auth-guard";
import {MdlModule} from "angular2-mdl";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [
        SharedModule,
        statisticsRouting
    ],
    declarations: [
        StatisticsComponent,
        SampleComponent
    ],
    providers: [
        AuthGuard
    ]
})
export class StatisticsModule {}