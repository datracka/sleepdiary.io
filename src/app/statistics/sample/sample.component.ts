import {Component, OnInit} from "@angular/core";

const template = require('./sample.html');

@Component({
    selector: 'pie-chart-demo',
    template: template,
    styleUrls: ['./sample.scss'],
})
export class SampleComponent {

    // Pie
    public pieChartLabels: string[] = ['Good', 'Bad', 'Regular'];
    public pieChartData: number[] = [300, 500, 100];
    public pieChartType: string = 'pie';
    public form = {
        metricSample: 'sleeping-quality'
    }

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

}