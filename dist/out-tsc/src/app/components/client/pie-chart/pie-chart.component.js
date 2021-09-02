import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
let PieChartComponent = class PieChartComponent {
    constructor() {
        this.Highcharts = Highcharts;
    }
    ngOnInit() {
    }
    ngOnChanges() {
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
            };
        }
    }
};
__decorate([
    Input()
], PieChartComponent.prototype, "sizes", void 0);
PieChartComponent = __decorate([
    Component({
        selector: 'app-pie-chart',
        templateUrl: './pie-chart.component.html',
        styleUrls: ['./pie-chart.component.scss']
    })
], PieChartComponent);
export { PieChartComponent };
//# sourceMappingURL=pie-chart.component.js.map