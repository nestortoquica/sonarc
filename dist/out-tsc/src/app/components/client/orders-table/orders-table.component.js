import { __awaiter, __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ClientSign } from '../dialogs/client-dialog';
let OrdersTableComponent = class OrdersTableComponent {
    constructor(dialog, retailService, router, component) {
        this.dialog = dialog;
        this.retailService = retailService;
        this.router = router;
        this.component = component;
        this.date = [];
    }
    ngOnInit() {
        console.log("columns", this.columns);
        this.minDate = new Date();
        this.minDate.setDate(this.minDate.getDate() + 1);
        this.displayedColumns = this.columns.split(',');
        console.log("this.columns", this.columns);
        this.local = JSON.parse(localStorage.getItem('data'));
    }
    ngOnChanges() {
        if (this.data) {
            this.dataSource = new MatTableDataSource(JSON.parse(this.data));
        }
    }
    applyFilter(event) {
        const filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    signatureModal(img) {
        this.dialog.open(ClientSign, {
            width: window.innerHeight < window.innerWidth ? '55%' : '80%',
            height: window.innerHeight < window.innerWidth ? '65%' : '40%',
            data: { image: img,
                type: 'sign'
            },
        });
    }
    pickedModal(img) {
        this.dialog.open(ClientSign, {
            width: window.innerHeight < window.innerWidth ? '55%' : '80%',
            height: window.innerHeight < window.innerWidth ? '65%' : '40%',
            data: {
                image: img,
                type: 'picked'
            },
        });
    }
    update(order, date) {
        return __awaiter(this, void 0, void 0, function* () {
            if (date) {
                let month = date.getMonth().toString().length == 1 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                let day = date.getDate().toString().length == 1 ? '0' + date.getDate() : date.getDate();
                let d = date.getFullYear() + '-' + month + '-' + day;
                let data = {
                    language: localStorage.getItem('lenguage').toString(),
                    id_company: this.local.data_company.id_company,
                    id_package_code: order.id_package_code,
                    date_update: d,
                    token: localStorage.getItem('token')
                };
                let res = yield this.retailService.updateExpirationDate(data);                
            }
        });
    }
};
__decorate([
    Input()
], OrdersTableComponent.prototype, "data", void 0);
__decorate([
    Input()
], OrdersTableComponent.prototype, "columns", void 0);
OrdersTableComponent = __decorate([
    Component({
        selector: 'app-orders-table',
        templateUrl: './orders-table.component.html',
        styleUrls: ['./orders-table.component.scss']
    })
], OrdersTableComponent);
export { OrdersTableComponent };
//# sourceMappingURL=orders-table.component.js.map