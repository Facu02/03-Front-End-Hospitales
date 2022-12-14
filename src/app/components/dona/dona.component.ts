import { Component, Input , OnChanges, SimpleChanges} from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnChanges{
 

  @Input () titulo:string = "sin titulo"

  @Input ('valores') doughnutChartLabels: string[] = [ 'Facu2', 'In-Store Sales', 'Mail-Order Sales' ];



  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ] },
    ]
  };

  ngOnChanges(changes: SimpleChanges): void {

    this.doughnutChartData={
 
      labels: this.doughnutChartLabels,
      datasets:[{ data: [ 350, 450, 100 ] }] 
    }
    
  }
  public doughnutChartType: ChartType = 'doughnut';


}
