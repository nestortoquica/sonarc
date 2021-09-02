import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
let ChartEntregasComponent = class ChartEntregasComponent {
    constructor() {
        this.Highcharts = Highcharts;
        this.data = [];
        this.total = 0;
    }
    ngOnInit() {
        let windowsWidth = window.innerWidth;
        if (windowsWidth) {
            this.widthgraphics = (((windowsWidth * 0.85) - 72) / 3) - 50;
        }
    }
    ngOnChanges(changes) {
        if (this.arrayName != '') {
            this.arrayName = this.arrayName.split(",");
            this.arrayY = this.arrayY.split(",");
            let temp;
            this.arrayName.forEach((element, index) => {
                if (element != "" && this.arrayY[index] != "") {
                    temp = {
                        name: element,
                        y: parseFloat(this.arrayY[index]),
                        z: 0
                    };
                    this.data.push(temp);
                }
            });
            this.chartOptions = {
                chart: {
                    type: 'pie',
                    borderColor: "red",
                },
                colors: ['#9BFF8A', '#FFE558', '#0E68CE', '#FD6A6A', '#CAFFC1', '#434343'],
                accessibility: {
                    description: ''
                },
                title: {
                    text: ''
                },
                tooltip: {
                    borderWidth: 0,
                    backgroundColor: "transparent",
                    shadow: false,
                    useHTML: true,
                    headerFormat: '',
                    pointFormat: '' //'<b>{point.name}</b>: </b>{point.percentage:.0f}% ({point.y})'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false,
                        },
                        showInLegend: true,
                    },
                    events: {
                        legendItemClick: function () {
                            var legenedItemIndex = this.index; // index of highchart legend item
                            // $("your html element:eq(" + legenedItemIndex + ")") //do something with your element
                        }
                    }
                },
                legend: {
                    layout: 'horizontal',
                    floating: false,
                    // align: 'left',
                    // verticalAlign: 'bottom',
                    // width: '85%',
                    // x: 30,
                    labelFormatter: function () {
                        if (this.percentage.toFixed(0) != 0) {
                            this.total += this.y;
                        }
                        return '<span style="color: #9B9B9B; font-family: Lato-Regular; font-size: 13px; padding-left: 2%;">' + this.name + '</span><br/><span style="color: #000; font-family: Lato-Regular; font-size: 13px;">' + this.percentage.toFixed(0) + '% (' + this.y + ')</span>';
                    },
                },
                series: [
                    {
                        minPointSize: 10,
                        innerSize: '85%',
                        zMin: 0,
                        data: this.data,
                    }
                ],
                credits: {
                    enabled: false
                }
            };
            this.chartOptions['series'][0].data.forEach((element, index) => {
                this.total += element.y;
            });
        }
        else {
            this.arrayName = [];
            this.arrayY = [];
            this.data = [];
        }
    }
};
__decorate([
    Input()
], ChartEntregasComponent.prototype, "arrayName", void 0);
__decorate([
    Input()
], ChartEntregasComponent.prototype, "arrayY", void 0);
ChartEntregasComponent = __decorate([
    Component({
        selector: 'app-chart-entregas',
        templateUrl: './chart-entregas.component.html',
        styleUrls: ['./chart-entregas.component.scss']
    })
], ChartEntregasComponent);
export { ChartEntregasComponent };
//# sourceMappingURL=chart-entregas.component.js.map