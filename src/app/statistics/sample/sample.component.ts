import { Component } from "@angular/core";

const template = require('./sample.html');

@Component({
  selector: 'pie-chart-demo',
  template: template,
  styleUrls: ['./sample.scss'],
})
export class SampleComponent {


  //line

  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Sleeping Quality' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Tiredness Feeling' }
  ];
  public lineChartLabels: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public lineChartType: string = 'line';
  public lineChartLegend: boolean = true;


  // Pie

  public pieChartType: string = 'pie';
  public pieChartLabels: string[] = ['Good', 'Regular', 'Bad'];
  public pieChartLabelsDreams: string[] = ['Good Dreams', 'Bad Dreams', 'No idea'];
  public pieChartLabelsTrigers: string[] = ['Smoking', 'Sport', 'Stress', 'Eating heavy', 'Alcohol', 'Worries', 'Room conditions', 'Happiness', 'Fear', 'Partner'];
  public pieChartData1: number[] = [300, 500, 100];
  public pieChartData2: number[] = [500, 100, 300];
  public pieChartData3: number[] = [200, 600, 200];
  public pieChartData4: number[] = [100, 100, 80, 80, 20, 100, 200, 200, 50, 50, 20, 100];

  // bar

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Sleeping Quality' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Tiredness Feelings' }
  ];



}
