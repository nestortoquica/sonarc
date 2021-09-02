import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() sizes
  chartOptions
  Highcharts = Highcharts;

  constructor() { }

  ngOnInit() {
    
    

  }

  ngOnChanges(): void {
    if (this.sizes) {
      this.chartOptions = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
        text: ''
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      accessibility: {
          point: {
              valueSuffix: 'Orders'
          }
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.y} '
              },
              showInLegend: true
          }
      },
      series: [{
          name: 'Brands',
          colorByPoint: true,
          data: JSON.parse(this.sizes)
      }],
      credits: {
        enabled: false
      }
      }
    }
    }

}
