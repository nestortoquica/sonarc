import { __decorate } from "tslib";
import { Component } from '@angular/core';
let DashboardLocatarioComponent = class DashboardLocatarioComponent {
    constructor(ServerUserService, _router, translate) {
        this.ServerUserService = ServerUserService;
        this._router = _router;
        this.translate = translate;
        // google maps zoom level
        this.zoom = 8;
        // initial center position for the map
        this.lat = 25.690290; // esto deberia ser un servicio
        this.lng = -100.315014; // esto deberia ser un servicio
        this.count = 0; // esto deberia ser un servicio
        this.arrayMarker = [];
        this.dataSeries = '';
        this.id_locker = [];
        this.locker_name = [];
        this.locker_address = [];
        this.responseQuantityCarrier = [JSON.stringify({
                "name": "suyo", y: 300, z: 0
            })];
        this.responseQuantityCarrierName = [];
        this.responseQuantityCarrierY = [];
        this.responseQuantityLockerName = [];
        this.responseQuantityLockerY = [];
        this.lockers = [];
        this.lockersInfo = [];
    }
    ngOnInit() {
        if (localStorage.getItem("data") && localStorage.getItem("data") != 'undefined' && localStorage.getItem("data") != '') {
            let data = JSON.parse(localStorage.getItem("data"));
            if (data.result.user_type == "LOCATARIO" && localStorage.getItem("id_company") && localStorage.getItem("id_company") != "" && localStorage.getItem("id_company") != "undefine") {
                this.idUserCompany = localStorage.getItem("id_company");
            }
        }
        if (localStorage.getItem("id_company") && localStorage.getItem("id_company") != "" && localStorage.getItem("id_company") != "undefine") {
            this.idUserCompany = localStorage.getItem("id_company");
        }
        if (this.idUserCompany != undefined) {
            this.setChartLine();
            this.setChartPie1();
            this.setChartPie2();
            this.setLockerMap();
        }
    }
    setChartLine() {
        let d = new Date();
        let dateStart = this.subtractDays();
        let fstart = new Date(dateStart);
        let start = dateStart.getFullYear() + '-' + ("0" + (dateStart.getMonth() + 1)).slice(-2) + '-' + ("0" + dateStart.getDate()).slice(-2) + ' 00:00:00';
        let end = d.getFullYear() + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + '-' + ("0" + d.getDate()).slice(-2) + ' ' + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
        let cont = 0;
        let arrDate = [];
        let auxDate = [];
        do {
            cont++;
            arrDate.push(fstart.getDate() + '/' + (fstart.getMonth() + 1));
            auxDate.push(fstart.getFullYear() + '-' + ("0" + (fstart.getMonth() + 1)).slice(-2) + '-' + ("0" + fstart.getDate()).slice(-2));
            fstart.setDate(fstart.getDate() + 1);
        } while (cont < 15);
        let data = {
            language: localStorage.getItem('lenguage'),
            id_company: this.idUserCompany,
            fecha_inicio: start,
            fecha_fin: end
        };
        this.ServerUserService.get_quantity_last_days(data).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                let responseQuantity = [];
                let arrTotal = [];
                let temp;
                res.result_list.forEach((element, index) => {
                    if (element[0] == "QUANTITY") {
                        this.translate.get('deliveries.' + element[0]).subscribe((label) => {
                            temp = { name: label, data: [] };
                            arrTotal.push({ name: element[0], total: element[1][0].TOTAL });
                        });
                    }
                    else {
                        let axisX = [];
                        let cant = 0;
                        auxDate.forEach(i => { axisX.push(null); });
                        element[1].forEach(item => {
                            if (auxDate.indexOf(item.date) != -1)
                                axisX.splice(auxDate.indexOf(item.date), 1, item.cant);
                            cant += item.cant;
                        });
                        this.translate.get('deliveries.' + element[0]).subscribe((label) => {
                            responseQuantity.push({ name: label, data: axisX });
                            arrTotal.push({ name: element[0], total: cant });
                        });
                    }
                });
                responseQuantity.push(temp);
                this.totals = JSON.stringify(arrTotal);
                this.dataSeries = JSON.stringify(responseQuantity);
                this.categories = JSON.stringify(arrDate);
            }
        });
    }
    setChartPie1() {
        let dataCarrier = {
            "language": localStorage.getItem('lenguage'),
            "id_company": this.idUserCompany,
            "top": 3
        };
        this.ServerUserService.get_quantity_carrier(dataCarrier).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                res.quantity_carrier.forEach(element => {
                    this.responseQuantityCarrierName.push(element.courier_name);
                    this.responseQuantityCarrierY.push(element.cant);
                });
            }
            else {
                this.responseQuantityCarrierName = [];
                this.responseQuantityCarrierY = [];
            }
        });
    }
    setChartPie2() {
        let dataLocker = {
            "language": localStorage.getItem('lenguage'),
            "id_company": this.idUserCompany,
            "top": 3
        };
        this.ServerUserService.get_quantity_locker(dataLocker).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                res.quantity_package_locker.forEach(element => {
                    this.responseQuantityLockerName.push(element.locker_name);
                    this.responseQuantityLockerY.push(element.cant);
                });
            }
            else {
                this.responseQuantityLockerName = [];
                this.responseQuantityLockerY = [];
            }
        });
    }
    setLockerMap() {
        let dataCompany = {
            "language": localStorage.getItem('lenguage'),
            "id_company": this.idUserCompany,
            "top": 3
        };
        this.ServerUserService.get_query_locker_company(dataCompany).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                res.locker_company[0][1].forEach(element => {
                    this.lockers.push(res.locker_company[0][1][this.count++]);
                    this.arrayMarker.push({
                        lat: element.latitud,
                        lng: element.longitud,
                        label: 'V',
                        draggable: false,
                        id_locker: element.id_locker,
                        locker_name: element.locker_name,
                        locker_address: element.locker_address
                    });
                });
                this.arrayMarker = JSON.stringify(this.arrayMarker);
                this.getLockerAddress();
            }
            else {
                this.lockers = [];
                this.arrayMarker = JSON.stringify([{}]);
            }
        });
    }
    subtractDays() {
        let date = new Date();
        date.setDate(date.getDate() - 14);
        return date;
    }
    onSeeLocker(id_locker, name_locker) {
        this.ServerUserService.setIdLocker(id_locker);
        this._router.navigateByUrl("l-ad/locker/" + name_locker);
    }
    lockerAddress(event) {
        // let auxArray = JSON.parse(this.arrayMarker);
        // auxArray.forEach(element => {
        //   if(element.id_locker == event){
        //   this.id_locker.push(element.id_locker);
        //   this.locker_name.push(element.locker_name);
        //   this.locker_address.push(element.locker_address)
        //   }
        // });
    }
    getLockerAddress() {
        this.lockersInfo = JSON.parse(this.arrayMarker);
        this.lockersInfo.forEach(element => {
            this.id_locker.push(element.id_locker);
            this.locker_name.push(element.locker_name);
            this.locker_address.push(element.locker_address);
        });
    }
};
DashboardLocatarioComponent = __decorate([
    Component({
        selector: 'app-dashboard-locatario',
        templateUrl: './dashboard-locatario.component.html',
        styleUrls: ['./dashboard-locatario.component.scss']
    })
], DashboardLocatarioComponent);
export { DashboardLocatarioComponent };
//# sourceMappingURL=dashboard-locatario.component.js.map