import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
let ChartBarComponent = class ChartBarComponent {
    constructor() {
        this.Highcharts = Highcharts;
        this.data = [];
        this.categories = [];
        this.total = 0;
        this.cant1 = [];
        this.cant2 = [];
        this.cant3 = [];
        this.columns = [];
        this.datar = [];
    }
    ngOnInit() {
        this.lang = localStorage.getItem('lenguage');
        this.lang == 'EN' ?
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
            ] :
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
            ];
    }
    ngOnChanges() {
        if (this.type == 'orders' && this.arrayName) {
            if (this.arrayName.length != 0 && this.categories.length == 0) {
                this.arrayName.forEach((element) => {
                    this.categories.push(element.locker_name);
                    element.MONTH.forEach((e, i) => {
                        this.cant1.length <= 11 ? this.cant1.push(e.cant) :
                            (this.cant2.length <= 11) ? this.cant2.push(e.cant) :
                                this.cant3.push(e.cant);
                    });
                });
            }
            if (this.arrayName != '') {
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
                        { name: this.categories[0], data: this.cant1 },
                        { name: this.categories[1], data: this.cant2 },
                        { name: this.categories[2], data: this.cant3 },
                    ],
                    credits: {
                        enabled: false
                    }
                };
            }
            else {
                this.arrayName = [];
                this.data = [];
            }
        }
        else {
            if (this.arrayName && this.arrayName.length != 0) {
                this.arrayName = JSON.parse(this.arrayName);
                this.arrayName.forEach(e => {
                    this.columns.push(e.compartment_name);
                    this.datar.push({ name: e.compartment_name, y: e.cantidad, drilldown: e.compartment_name });
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
};
__decorate([
    Input()
], ChartBarComponent.prototype, "arrayName", void 0);
__decorate([
    Input()
], ChartBarComponent.prototype, "type", void 0);
ChartBarComponent = __decorate([
    Component({
        selector: 'app-chart-bar',
        templateUrl: './chart-bar.component.html',
        styleUrls: ['./chart-bar.component.scss']
    })
], ChartBarComponent);
export { ChartBarComponent };
//# sourceMappingURL=chart-bar.component.js.map