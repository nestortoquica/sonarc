import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
let ChartSplineComponent = class ChartSplineComponent {
    constructor() {
        this.Highcharts = Highcharts;
        this.heigthgraphics = 350;
        this.on_time = 0;
        this.delayed = 0;
        this.totals = 0;
    }
    ngOnInit() { }
    ngOnChanges(changes) {
        let windowsWidth = window.innerWidth;
        if (windowsWidth) {
            this.widthgraphics = (((windowsWidth * 0.85) - 72) / 3) - 50;
        }
        if (this.responseSeries) {
            let arrayY = JSON.parse(this.responseSeries);
            let arrayX = JSON.parse(this.categories);
            let legend = JSON.parse(this.seriesName);
            this.setChart(arrayX, arrayY, legend);
        }
    }
    setChart(arrayX, arrayY, legend) {
        this.chartOptions = {
            chart: {
                type: 'spline', //'line'
            },
            colors: ['#9BFF8A', '#FFE558', '#fff'],
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            exporting: {
                enabled: false
            },
            xAxis: {
                categories: arrayX,
                labels: {
                    rotation: -45,
                    align: 'right',
                    reserveSpace: true,
                    style: {
                        fontSize: '7pt',
                        textTransform: 'uppercase',
                    }
                },
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            tooltip: {
                pointFormat: '<b>{series.name} {point.y:,.0f}<br/>'
            },
            plotOptions: {
                series: {
                    marker: {
                        // enabled: false, // points
                        symbol: 'circle',
                        radius: 4,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: arrayY,
            legend: {
                layout: 'horizontal',
                floating: false,
                labelFormatter: function () {
                    if (legend != []) {
                        legend.forEach(item => {
                            if (item.name == 'QUANTITY')
                                this.totals = item.total;
                            else if (item.name == 'ON_TIME')
                                this.on_time = item.total;
                            else
                                this.delayed = item.total;
                        });
                        if (this.name == 'ON TIME') {
                            return '<span style="color: #9B9B9B; font-family: Lato-Regular; font-size: 13px;">' + this.name + '</span><br/><span style="color: #000; font-family: Lato-Regular; font-size: 36px;">' + this.on_time + '</span>';
                        }
                        else if (this.name == 'DELAYED') {
                            return '<span style="color: #9B9B9B; font-family: Lato-Regular; font-size: 13px;">' + this.name + '</span><br/><span style="color: #000; font-family: Lato-Regular; font-size: 36px;">' + this.delayed + '</span>';
                        }
                        else {
                            return '<span style="color: #9B9B9B; font-family: Lato-Regular; font-size: 13px;">' + this.name + '</span><br/><span style="color: #000; font-family: Lato-Regular; font-size: 36px;">' + this.totals + '</span>';
                        }
                    }
                },
            },
            credits: {
                enabled: false
            }
        };
    }
};
__decorate([
    Input()
], ChartSplineComponent.prototype, "categories", void 0);
__decorate([
    Input()
], ChartSplineComponent.prototype, "seriesName", void 0);
__decorate([
    Input()
], ChartSplineComponent.prototype, "responseSeries", void 0);
ChartSplineComponent = __decorate([
    Component({
        selector: 'app-chart-spline',
        templateUrl: './chart-spline.component.html',
        styleUrls: ['./chart-spline.component.scss']
    })
], ChartSplineComponent);
export { ChartSplineComponent };
//# sourceMappingURL=chart-spline.component.js.map