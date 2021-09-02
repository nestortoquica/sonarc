import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PaymentsComponent = class PaymentsComponent {
    constructor(ServerUserService) {
        this.ServerUserService = ServerUserService;
        this.company_data = { name_company: "", total_amount: 0, total_packaje: 0 };
    }
    ngOnInit() {
        this.currentURL = document.location.href;
        this.admin = this.currentURL.indexOf("d-ad/payments") != -1 ? true : false;
        this.dataTablePayments();
    }
    dataTablePayments() {
        let dataTableAux = [];
        if (this.currentURL.indexOf("d-ad/payments") != -1) {
            dataTableAux.push({
                order: "*299304",
                description: "*Pago de la orden 299304",
                date: "*01-08-19",
                name_: "*Alyvia Cope",
                user: "*fmartinez@vivipost.com",
                amount: "*$120.00"
            });
        }
        else if (this.currentURL.indexOf("l-ad/payments") != -1) {
            this.dataColumn = "";
            this.dataTable = [];
        }
    }
    getDatepicker(event) {
        let dataTableAux = [];
        let result = JSON.parse(event);
        let params = {
            "language": localStorage.getItem('lenguage'),
            "id_company": localStorage.getItem("id_company"),
            "fecha_inicio": result.timeStart,
            "fecha_fin": result.timeEnd //"2020-9-18 18:05:55"
        };
        this.ServerUserService.get_query_payment_company(params).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                this.company_data = {
                    name_company: res.return_resul[0][1][0].name_company,
                    total_amount: res.return_resul[0][1][0].total_amount,
                    total_packaje: res.return_resul[0][1][0].total_packaje
                };
                localStorage.setItem('company_data', JSON.stringify(this.company_data));
                res.return_resul[0][1][0].PACKAGE.forEach(element => {
                    dataTableAux.push({
                        id_locker: element.locker_neme,
                        tracking: element.tracking,
                        carrier: element.name_currier,
                        date: element.fecha_pago,
                        amount: element.amount_payable,
                    });
                });
                this.dataColumn = JSON.stringify(Object.keys(dataTableAux[0]));
                this.dataTable = JSON.stringify(dataTableAux);
            }
            else {
                this.dataColumn = [];
                this.dataTable = [];
                this.company_data = { name_company: "", total_amount: 0, total_packaje: 0 };
            }
        });
    }
};
PaymentsComponent = __decorate([
    Component({
        selector: 'app-payments',
        templateUrl: './payments.component.html',
        styleUrls: ['./payments.component.scss']
    })
], PaymentsComponent);
export { PaymentsComponent };
//# sourceMappingURL=payments.component.js.map