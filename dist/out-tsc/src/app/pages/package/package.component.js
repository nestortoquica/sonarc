import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PackageComponent = class PackageComponent {
    constructor(ServerUserService) {
        this.ServerUserService = ServerUserService;
        this.valuesCards = [];
        this.id = '';
        this.dataTable = [];
    }
    ngOnInit() {
        if (localStorage.getItem("data") && localStorage.getItem("data") != 'undefined' && localStorage.getItem("data") != '') {
            let data = JSON.parse(localStorage.getItem("data"));
            if (data.result.user_type == "LOCATARIO") {
                this.idUserCompany = data.data_company.id_company;
            }
        }
        if (localStorage.getItem("id_user") && localStorage.getItem("id_user") != "" && localStorage.getItem("id_user") != "undefine") {
            this.id_User = localStorage.getItem("id_user");
        }
        if (localStorage.getItem("user_type") == '2') {
            this.getDataQuantity_status();
            this.getDataTablePackages();
        }
        else {
            this.getDataPackages();
        }
    }
    getDataPackages() {
        this.data = {
            "language": localStorage.getItem('lenguage'),
            "id_company": this.idUserCompany,
            "top": 1,
            "id_user": this.id_User
        };
        this.ServerUserService.get_quantity_locker(this.data).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                this.topName = res.quantity_package_locker[0].locker_name;
            }
            else {
                this.valuesCards = [];
            }
        });
        this.data = {
            "language": localStorage.getItem('lenguage'),
            "id_company": this.idUserCompany,
            "id_user": this.id_User
        };
        this.ServerUserService.get_quantity_company(this.data).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                res.result_consumer_package[0][1].forEach(quantity => {
                    this.valuesCards.push({
                        topName: this.topName,
                        pickup: quantity.total_pickup,
                        active: quantity.total_avaliable
                    });
                });
                res.result_consumer_package[1][1].forEach(package_consumer => {
                    this.dataTable.push({
                        name: package_consumer.usuario,
                        tracking: package_consumer.tracking_number,
                        courier: package_consumer.courier_name,
                        id_locker: package_consumer.locker_name,
                        door: package_consumer.door,
                        delivered: package_consumer.package_delivery_date,
                        collected: package_consumer.package_pickup_date,
                        status: package_consumer.status_package,
                        signature: package_consumer.IMAGE.url_view_imagen_signature,
                        // see_locker:    package_consumer.id_locker,
                        cost_use: "$15.00"
                    });
                });
                this.dataColumn = JSON.stringify(Object.keys(this.dataTable[0]));
                this.dataTableAux = JSON.stringify(this.dataTable);
            }
            else {
                this.dataTable = [];
                this.dataTableAux = "[{}]";
            }
        });
    }
    getDataQuantity_status() {
        let data = {
            "language": localStorage.getItem('lenguage')
        };
        this.ServerUserService.get_quantity_status(data).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                this.valuesCards.push({
                    active: res.quantity_status[0].total_per_status,
                    pickup: res.quantity_status[1].total_per_status
                });
            }
        });
    }
    getDataTablePackages() {
        let data = {
            "language": localStorage.getItem('lenguage')
        };
        this.ServerUserService.get_query_consumer(data).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                res.result_consumer_package[0][1].forEach(element => {
                    element.LOCKER.forEach(elementPackage => {
                        elementPackage.PACKAGE.forEach(elementPackageUser => {
                            this.dataTable.push({
                                name: element.first_name + ' ' + element.surname,
                                tracking: elementPackageUser.tracking_number,
                                carrier: elementPackageUser.courier_name,
                                locker_name: elementPackage.locker_name,
                                door: elementPackageUser.name_locker_module + elementPackageUser.door_number,
                                delivered: elementPackageUser.package_delivery_date,
                                collected: elementPackageUser.package_pickup_date,
                                status: elementPackageUser.status_package,
                                signature: elementPackageUser.IMAGE.url_view_imagen_signature,
                                cost_use: "$15.00",
                                see_locker: elementPackage.id_locker
                            });
                        });
                    });
                });
                this.dataColumn = JSON.stringify(["name", "tracking", "carrier", "locker_name", "door", "delivered", "collected", "status", "signature", "cost_use"]);
                // this.dataColumn =JSON.stringify(Object.keys(this.dataTable[0]));
                this.dataTableAux = JSON.stringify(this.dataTable);
            }
            else {
                this.dataTable = [];
                this.dataTable.push({
                    name_event: 'NO RECORDS'
                });
            }
        });
    }
};
PackageComponent = __decorate([
    Component({
        selector: 'app-package',
        templateUrl: './package.component.html',
        styleUrls: ['./package.component.scss']
    })
], PackageComponent);
export { PackageComponent };
//# sourceMappingURL=package.component.js.map