import {Component} from '@angular/core';
import {Header} from "../../header/header";
import {Footer} from "../../footer/footer";

@Component({
    selector: 'monthly-view',
    template: `
    <b>Monthly View!!</b>
    `,
    providers: [
        Header,
        Footer
    ]

})
export class MonthlyViewComponent {
}
