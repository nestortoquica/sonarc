import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ConsumerPayComponent = class ConsumerPayComponent {
    constructor(ServerUserService, _router) {
        this.ServerUserService = ServerUserService;
        this._router = _router;
        this.arrayPay = [];
        this.credit = 0;
        this.pendingPackages = [];
        this.pay_packages = [];
        this.totalPay = 0;
        this.bandCredit = true;
    }
    ngOnInit() {
        this.step1 = true;
        let params = {
            "language": localStorage.getItem('lenguage'),
            "id_user": localStorage.getItem("id_user")
        };
        this.ServerUserService.get_query_balance_consumer(params).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                let aux = res.balance_consumer.split(" ");
                this.credit = parseInt(aux[0]);
            }
            this.get_expired_package(params);
        });
    }
    get_expired_package(params) {
        this.ServerUserService.get_expired_package(params).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                res.result_return[0][1].forEach((item, index) => {
                    this.pendingPackages.push({
                        "id_package": item.id_package + '-' + item.size_rate,
                        "package_code": item.tracking_number,
                        "amount": item.size_rate
                    });
                    this.totalPay += item.size_rate;
                });
                if (this.credit < this.totalPay) {
                    this.totalPay -= this.credit;
                }
                else {
                    this.totalPay = 0;
                }
            }
            else {
                console.log("Err: ", res);
            }
        });
    }
    onCheckedAmount(e, amount, checkCredit) {
        this.totalPay = 0;
        let hasClass;
        var item = document.getElementById("checkCredit");
        let table = document.getElementById("package_table");
        for (var i = 0; i < table.rows.length - 2; i++) {
            for (var j = 0; j < 3; j++) {
                if (table.rows[i].cells[j].childNodes[0].id) {
                    if (table.rows[i].cells[j].childNodes[0].classList.contains("mat-checkbox-checked")) {
                        let arr = (table.rows[i].cells[j].childNodes[0].id).split('-');
                        this.totalPay += parseInt(arr[1]);
                    }
                }
            }
        }
        if (!e.checked) {
            if (!checkCredit)
                this.totalPay -= amount;
        }
        else {
            if (checkCredit)
                this.totalPay -= amount;
            else
                this.totalPay += amount;
        }
        hasClass = item.classList.contains('mat-checkbox-checked');
        this.bandCredit = hasClass;
        if (!checkCredit && hasClass) {
            if (this.credit < this.totalPay)
                this.totalPay -= this.credit;
            else
                this.totalPay = 0;
        }
        if (this.totalPay < 0)
            this.totalPay = 0;
    }
    get_pay_packages() {
        let table = document.getElementById("package_table");
        for (var i = 0; i < table.rows.length - 2; i++) {
            for (var j = 0; j < 3; j++) {
                if (table.rows[i].cells[j].childNodes[0].id) {
                    if (table.rows[i].cells[j].childNodes[0].classList.contains("mat-checkbox-checked")) {
                        let arr = (table.rows[i].cells[j].childNodes[0].id).split('-');
                        this.pay_packages.push({ "id_package": arr[0], "size_rate": parseInt(arr[1]) });
                    }
                }
            }
        }
    }
    onNextStepPay() {
        this.get_pay_packages();
        var item = document.getElementById("checkCredit");
        let hasClass = item.classList.contains('mat-checkbox-checked');
        this.bandCredit = hasClass;
        if (this.pay_packages.length > 0) {
            if (this.totalPay > 0) { //Pago con SALDO Y TARJETAS o solo con TARJETAS
                this.step1 = false;
                this.step2 = true;
                this.packet_data = JSON.stringify({
                    "pay_packages": this.pay_packages,
                    "totalPay": this.totalPay,
                    "bandCredit": this.bandCredit
                });
            }
            else if (this.bandCredit && this.totalPay == 0) { //Pago solo con SALDO
                let params = {
                    "language": localStorage.getItem('lenguage'),
                    "id_user": localStorage.getItem("id_user"),
                    "pay_balance": true,
                    "pay_packages": this.pay_packages
                };
                this.service_pay_expired_packages(params);
            }
        }
        else
            console.log("No hay paquetes seleccionados");
    }
    service_pay_expired_packages(data) {
        this.ServerUserService.post_pay_expired_packages(data).subscribe(res => {
            if (!res.mensaje_return.ERROR) {
                this._router.navigateByUrl("/dashboard");
                localStorage.setItem("add_address", 'success');
                localStorage.setItem("msgAddress", "¡Tu pago ha sido abonado de manera exitosa!");
            }
            else {
                this._router.navigateByUrl("/dashboard");
                localStorage.setItem("add_address", 'error');
                localStorage.setItem("msgAddress", res.mensaje_return.ERROR_MENSAGGE);
            }
        });
    }
};
ConsumerPayComponent = __decorate([
    Component({
        selector: 'app-consumer-pay',
        templateUrl: './consumer-pay.component.html',
        styleUrls: ['./consumer-pay.component.scss']
    })
], ConsumerPayComponent);
export { ConsumerPayComponent };
//# sourceMappingURL=consumer-pay.component.js.map