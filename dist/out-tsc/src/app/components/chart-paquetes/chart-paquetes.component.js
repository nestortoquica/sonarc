import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
let ChartPaquetesComponent = class ChartPaquetesComponent {
    constructor() {
        this.Highcharts = Highcharts;
        this.heigthgraphics = 350;
        this.styleCard = '';
    }
    ngOnInit() {
        let windowsWidth = window.innerWidth;
        if (windowsWidth) {
            this.widthgraphics = (((windowsWidth * 0.85) - 72) / 3) - 50;
        }
    }
    ngOnChanges(changes) {
        let windowsWidth = window.innerWidth;
        if (windowsWidth) {
            this.widthgraphics = (((windowsWidth * 0.85) - 72) / 3) - 50;
        }
        if (this.axisX != '') {
            this.axisX = this.axisX.split(",");
            this.axisY = this.axisY.split(",");
            this.axisX.forEach((element, index) => {
                this.axisX[index] = element.substr(0, 3);
            });
            this.axisY.forEach((element, index) => {
                this.axisY[index] = parseFloat(element);
            });
            this.chartOptions = {
                chart: {
                    type: 'spline',
                    marginBottom: 100
                },
                colors: ['#9BFF8A', '#FFE558', '#0E68CE', '#FD6A6A', '#CAFFC1', '#434343'],
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: this.axisX,
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
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                series: [
                    {
                        // showInLegend: false,
                        name: this.seriesName,
                        data: this.axisY
                    }
                ],
                credits: {
                    enabled: false
                }
            };
        }
        else {
            this.axisX = [];
            this.axisY = [];
            this.seriesName = [];
        }
    }
};
__decorate([
    Input()
], ChartPaquetesComponent.prototype, "axisX", void 0);
__decorate([
    Input()
], ChartPaquetesComponent.prototype, "axisY", void 0);
__decorate([
    Input()
], ChartPaquetesComponent.prototype, "seriesName", void 0);
ChartPaquetesComponent = __decorate([
    Component({
        selector: 'app-chart-paquetes',
        templateUrl: './chart-paquetes.component.html',
        styleUrls: ['./chart-paquetes.component.scss']
    })
], ChartPaquetesComponent);
export { ChartPaquetesComponent };
//# sourceMappingURL=chart-paquetes.component.js.map