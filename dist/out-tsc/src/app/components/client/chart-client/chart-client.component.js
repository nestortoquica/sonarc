import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
let ChartClientComponent = class ChartClientComponent {
    constructor() {
        this.Highcharts = Highcharts;
        this.heigthgraphics = 350;
        this.quantity = [];
    }
    ngOnInit() {
    }
    ngOnChanges(changes) {
        let months;
        this.lang = localStorage.getItem('lenguage');
        this.lang == 'EN' ?
            this.meses = [
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
            ] :
            this.meses = [
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
            ];
        if (this.data) {
            let datos = JSON.parse(this.data);
            datos.forEach(element => {
                this.type == 'dashboard' ?
                    this.quantity.push(element) :
                    this.type == 'orders' ? this.quantity.push(element.orders) :
                        this.quantity.push(element);
            });
        }
        if (this.months) {
            months = this.months.split(',');
        }
        this.type == 'dashboard' ?
            this.chartOptions = {
                title: {
                    text: ''
                },
                xAxis: {
                    categories: this.meses ? this.meses : ['']
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },
                legend: {
                    enabled: false
                },
                series: [{
                        lineWidth: 3,
                        marker: {
                            enabled: false
                        },
                        color: '#9EC57C',
                        name: '',
                        data: this.quantity ? this.quantity : ['']
                    }],
                credits: {
                    enabled: false
                }
            } :
            this.chartOptions = {
                title: {
                    text: ''
                },
                xAxis: {
                    categories: months ? months : ['']
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },
                legend: {
                    enabled: false
                },
                series: [{
                        lineWidth: 3,
                        marker: {
                            enabled: false
                        },
                        color: '#9EC57C',
                        name: '',
                        data: this.quantity ? this.quantity : ['']
                    }],
                credits: {
                    enabled: false
                }
            };
        this.setChart();
    }
    setChart() {
        this.chartOptions;
    }
};
__decorate([
    Input()
], ChartClientComponent.prototype, "data", void 0);
__decorate([
    Input()
], ChartClientComponent.prototype, "type", void 0);
__decorate([
    Input()
], ChartClientComponent.prototype, "months", void 0);
ChartClientComponent = __decorate([
    Component({
        selector: 'app-chart-client',
        templateUrl: './chart-client.component.html',
        styleUrls: ['./chart-client.component.scss']
    })
], ChartClientComponent);
export { ChartClientComponent };
//# sourceMappingURL=chart-client.component.js.map