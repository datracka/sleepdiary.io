import {NgModule} from "@angular/core";
import {statisticsRouting} from "./statistics.routes";
import {StatisticsComponent} from "./statistics";
import {SampleComponent} from "./sample/sample.component";
import {AuthGuard} from "../services/common/auth-guard";
import {SharedModule} from "../shared/shared.module";
import {BaseChartDirective} from "./sample/sample.directive";

@NgModule({
    imports: [
        SharedModule,
        statisticsRouting
    ],
    declarations: [
        StatisticsComponent,
        SampleComponent,
        BaseChartDirective
    ],
    providers: [
        AuthGuard
    ]
})
export class StatisticsModule {}