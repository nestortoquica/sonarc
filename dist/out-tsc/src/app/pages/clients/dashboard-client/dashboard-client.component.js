import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
let DashboardClientComponent = class DashboardClientComponent {
    constructor(retailService, router, component) {
        this.retailService = retailService;
        this.router = router;
        this.component = component;
        this.months = [];
        this.mostActiveLockers = [];
        this.lockers = [];
        this.hoverCoords = '';
    }
    ngOnInit() {
        this.local = JSON.parse(localStorage.getItem("data"));
        this.getLockersTable();
        this.getChartLine();
        this.getConsumerCount();
        // this.getMostActiveLocker();
        this.columns = ['lockerID', 'location', 'totalDeliveries', 'total', 'doors', 'available', 'status', 'serial'];
    }
    getChartLine() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {
                language: localStorage.getItem('lenguage'),
                year: new Date().getFullYear(),
                id_company: this.local.data_company.id_company,
                token: localStorage.getItem('token')
            };
            this.dataChart = yield this.retailService.getQuantityMonth(data);
            this.dataChart.forEach(m => {
                this.months.push(m.mes_package);
            });
            this.months = this.months.join(',');
            this.dataChart = JSON.stringify(this.dataChart);
        });
    }
    getMostActiveLocker() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {
                language: localStorage.getItem('lenguage'),
                year: new Date().getFullYear(),
                id_company: this.local.data_company.id_company,
                token: localStorage.getItem('token')
            };
            return yield this.retailService.getMostActiveLocker(data);
        });
    }
    getConsumerCount() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {
                language: localStorage.getItem('lenguage'),
                id_company: this.local.data_company.id_company,
                token: localStorage.getItem('token')
            };
            this.consumerCount = yield this.retailService.getConsumerCompanyCount(data);
        });
    }
    navigate(l) {
        let gridLocker = [];
        localStorage.setItem('id_locker', l.id_locker);
        localStorage.setItem('locker_name', l.locker_name);
        this.locks.forEach((e) => {
            if (e.id_locker == l.id_locker) {
                localStorage.setItem('lat', e.latitud);
                localStorage.setItem('lng', e.longitud);
                localStorage.setItem('address', e.locker_address);
                e.MODULE.forEach(m => {
                    m.template_module.forEach(t => {
                    });
                });
            }
        });
        // this.router.navigateByUrl(`l-retail/locker/${l.id_locker}`, {skipLocationChange: true})
    }
    getLockersTable() {
        return __awaiter(this, void 0, void 0, function* () {
            let month = new Date().getMonth();
            let year = new Date().getFullYear();
            let data = {
                language: localStorage.getItem("lenguage"),
                id_company: this.local.data_company.id_company,
                month_actuality: month,
                last_month: month - 1,
                year: year,
                token: localStorage.getItem('token')
            };
            let grid = [];
            this.locks = yield this.retailService.getLockersRetail(data);
            this.coords = [];
            this.mostActiveLockers = yield this.getMostActiveLocker();
            this.locks.forEach(e => {
                this.coords.push({
                    lat: Number(e.latitud),
                    lng: Number(e.longitud),
                    locker_name: e.locker_name,
                    address: e.locker_address,
                    lockerID: e.id_locker
                });
            });
            this.locks[0].MODULE.forEach((e, i) => {
                grid.push(e.template_module);
            });
            // localStorage.setItem('grid', JSON.stringify(grid))
            this.locks.forEach((element, i) => {
                this.lockers.push({
                    id: element.id_locker,
                    lockerID: element.locker_name,
                    location: 'view',
                    totalDeliveries: element.PACKAGE[0].DELIVERY[0].package_month_actuality_delivery,
                    total: element.PACKAGE[0].BY_COLLECT[0].result_delivery_to_collect,
                    doors: element.door_total,
                    available: element.compartments_available,
                    status: element.name_status,
                    serial: element.serial_locker,
                    deliveries: element.PACKAGE[0].DELIVERY[0].difference_percentage_delivery,
                    lat: element.latitud,
                    lng: element.longitud,
                    address: element.locker_address
                });
            });
            console.log(this.lockers);
            this.data = JSON.stringify(this.lockers);
        });
    }
    hoverMarker(e) {
        this.hoverCoords = JSON.stringify(e.coords);
    }
    outMarker() {
        this.hoverCoords = JSON.stringify({ lat: '', lng: '' });
    }
    seeLocker(locker, i) {
        return __awaiter(this, void 0, void 0, function* () {
            let month = new Date().getMonth();
            let year = new Date().getFullYear();
            let data = {
                language: localStorage.getItem("lenguage"),
                id_company: this.local.data_company.id_company,
                month_actuality: month,
                last_month: month - 1,
                year: year,
                token: localStorage.getItem('token')
            };
            let grid = [];
            this.tempLockers = yield this.retailService.getLockersRetail(data);
            this.tempLockers[i].MODULE.forEach((e, i) => {
                grid.push(e.template_module);
            });
            localStorage.setItem('grid', JSON.stringify(grid));
            this.component.setId(locker.id);
            localStorage.setItem('id_locker', locker.lockerID);
            localStorage.setItem('lat', locker.lat);
            localStorage.setItem('lng', locker.lng);
            localStorage.setItem('address', locker.address);
            localStorage.setItem('locker_name', locker.locker_name);
            this.router.navigateByUrl(`l-retail/locker/${locker.lockerID}`, { skipLocationChange: true });
        });
    }
};
DashboardClientComponent = __decorate([
    Component({
        selector: 'app-dashboard-client',
        templateUrl: './dashboard-client.component.html',
        styleUrls: ['./dashboard-client.component.scss']
    })
], DashboardClientComponent);
export { DashboardClientComponent };
//# sourceMappingURL=dashboard-client.component.js.map