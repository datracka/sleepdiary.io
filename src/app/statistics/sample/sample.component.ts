import {Component, OnInit} from "@angular/core";

const template = require('./sample.html');

@Component({
    selector: 'pie-chart-demo',
    template: template,
    styleUrls: ['./sample.scss'],
})
export class SampleComponent {


    //line

    public lineChartData: Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Sleeping Quality'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Tiredness Feelings'}
    ];
    public lineChartLabels: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    public lineChartType: string = 'line';
    public lineChartLegend: boolean = true;


    // Pie

    public pieChartType: string = 'pie';
    public pieChartLabels: string[] = ['Good', 'Regular', 'Bad'];
    public pieChartData: number[] = [300, 500, 100];

    //bar

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Sleeping Quality'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Tiredness Feelings'}
    ];



}