import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.scss']
})
export class ChartBarComponent implements OnInit {

  chartOptions: {};
  lang:string;
  Highcharts = Highcharts;
  @Input() arrayName;
  @Input() type
  months;
  data =[];
  categories = [];
  total = 0;
  cant1 = [];
  cant2 = [];
  cant3 = [];
  c1
  c2
  c3
  c4
  c5
  widthgraphics;
  columns = [];
  datar = []
  constructor() {}

  ngOnInit() {
    this.lang = localStorage.getItem('lenguage');
    this.lang=='EN'?
    this.months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]:
    this.months = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic'
    ]
  }

  ngOnChanges(){
    if (this.type=='orders' && this.arrayName) {
      if (this.arrayName.length!=0 && this.categories.length==0) {
        this.arrayName.forEach((element:any) => {
          this.categories.push(element.locker_name);
          element.MONTH.forEach((e:any, i)=>{
            this.cant1.length<=11?this.cant1.push(e.cant):
            (this.cant2.length<=11)?this.cant2.push(e.cant):
            this.cant3.push(e.cant);
          })
        });
      }
  
      if( this.arrayName != '' ){
        this.chartOptions = {
          chart: {
            type: 'column',
          },
          title: {
            text: ''
          },
          xAxis: {
            categories: this.months,
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: ''
            }
          },
          plotOptions: {
            column: {
                pointPadding: 0.01,
                borderWidth: 0
            }
        },
          series: [
            {name: this.categories[0], data: this.cant1},
            {name: this.categories[1], data: this.cant2},
            {name: this.categories[2], data: this.cant3},
          ],
          credits: {
            enabled: false
          }
        };
      }else{
        this.arrayName=[];
        this.data =[];
      }
    } else {
      if (this.arrayName && this.arrayName.length != 0) {
        this.arrayName = JSON.parse(this.arrayName)
        this.arrayName.forEach(e=>{
          this.columns.push(e.compartment_name);
          this.datar.push({name: e.compartment_name, y: e.cantidad, drilldown: e.compartment_name});
        });
        this.chartOptions = {
          chart: {
            type: 'column'
          },
          title: {
            text: ''
          },
          accesibility: {
            announceNewData: {
              enabled: true
            }
          },
          xAxis: {
            type: 'category'
          },
          yAxis: {
            title: {
              text: ''
            }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            series: {
                borderWidth: 6,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}'
                }
            }
        },
        series: [
          {
              name: "Orders",
              colorByPoint: true,
              data: this.datar
          }
      ],
    credits: {
      enabled: false
    }
        };
      }
    }

  }

}
