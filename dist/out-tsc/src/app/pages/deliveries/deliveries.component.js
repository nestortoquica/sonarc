import { __decorate } from "tslib";
import { Component } from '@angular/core';
let DeliveriesComponent = class DeliveriesComponent {
    constructor(ServerUserService) {
        this.ServerUserService = ServerUserService;
        this.valuesCards = [];
        this.id = '';
        this.dataTable = [];
        this.nameLocker = '';
    }
    ngOnInit() {
        if (localStorage.getItem("data") && localStorage.getItem("data") != 'undefined' && localStorage.getItem("data") != '') {
            let data = JSON.parse(localStorage.getItem("data"));
            if (data.result.id_user_type == 3) { //CLIENTE
                this.id_User = localStorage.getItem("id_user");
            }
        }
        if (localStorage.getItem("id_consumer") && localStorage.getItem("id_consumer") != "" && localStorage.getItem("id_consumer") != "undefine") {
            this.id_consumer = localStorage.getItem("id_consumer");
        }
        if (localStorage.getItem("id_user") && localStorage.getItem("id_user") != "" && localStorage.getItem("id_user") != "undefine") {
            this.id_User = localStorage.getItem("id_user");
        }
        this.data = {
            "language": localStorage.getItem('lenguage'),
            "id_user": this.id_User,
            "top": 1,
            "id_consumer": this.id_consumer
        };
        this.ServerUserService.get_quantity_locker(this.data).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                this.topName = res.quantity_package_locker[0].locker_name;
            }
            else {
                this.topName = "";
            }
        });
        this.data = {
            "language": localStorage.getItem('lenguage'),
            "id_user": this.id_User,
            "id_consumer": this.id_consumer
        };
        this.ServerUserService.get_query_consumer(this.data).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                if (res.result_consumer_package && res.result_consumer_package[0] && res.result_consumer_package[0][1] && res.result_consumer_package[0][1][0]) {
                    //cantidades
                    this.packageDelivery = res.result_consumer_package[0][1][0].package_delivery_count;
                    this.packageActive = res.result_consumer_package[0][1][0].package_available_count;
                    this.packageExpired = res.result_consumer_package[0][1][0].package_expired_count;
                    let locked_id = res.result_consumer_package[0][1][0].LOCKER[0].id_locker;
                    let locker_code = res.result_consumer_package[0][1][0].LOCKER[0].locker_code;
                    //table
                    if (res.result_consumer_package[0][1][0].LOCKER && res.result_consumer_package[0][1][0].LOCKER[0] && res.result_consumer_package[0][1][0].LOCKER[0].PACKAGE) {
                        res.result_consumer_package[0][1][0].LOCKER[0].PACKAGE.forEach(package_consumer => {
                            this.dataTable.push({
                                tracking: package_consumer.tracking_number,
                                id_locker: res.result_consumer_package[0][1][0].LOCKER[0].locker_name,
                                number_locker: locker_code,
                                carrier: package_consumer.courier_name,
                                code_access: package_consumer.order_number,
                                signature: package_consumer.IMAGE.url_view_imagen_signature,
                                delivered: package_consumer.package_delivery_date,
                                collected: package_consumer.package_pickup_date,
                                status_package: package_consumer.status_package,
                                due_date: package_consumer.expiration_date_code_package,
                            });
                        });
                    }
                    this.dataTableAux = this.dataTable;
                }
                this.dataColumn = JSON.stringify(Object.keys(this.dataTable[0]));
                this.dataTableAux = JSON.stringify(this.dataTable);
            }
            else {
                this.packageDelivery = 0;
                this.packageActive = 0;
                this.packageExpired = 0;
                this.dataTable = [];
                this.dataColumn = JSON.stringify(['tracking', 'id_locker', 'number_locker', 'carrier', 'code_access', 'signature', 'delivered', 'collected', 'status_package', 'due_date']);
                this.dataTableAux = "[]";
            }
        });
    }
};
DeliveriesComponent = __decorate([
    Component({
        selector: 'app-deliveries',
        templateUrl: './deliveries.component.html',
        styleUrls: ['./deliveries.component.scss']
    })
], DeliveriesComponent);
export { DeliveriesComponent };
//# sourceMappingURL=deliveries.component.js.map