import { __decorate } from "tslib";
import { Component } from '@angular/core';
let CompaniesComponent = class CompaniesComponent {
    constructor() { }
    ngOnInit() {
        this.dataTabCompany();
    }
    dataTabCompany() {
        let dataTableAux = [];
        dataTableAux.push({
            name_: "*Ethan Henderson",
            RFC: "*FML243354668754-k9",
            register_date: "*01-08-19",
            primary_user: "*fmartinez@vivipost.com",
            accounts: "12",
            logs: ""
        });
        this.dataColumn = JSON.stringify(Object.keys(dataTableAux[0]));
        this.dataTable = JSON.stringify(dataTableAux);
    }
};
CompaniesComponent = __decorate([
    Component({
        selector: 'app-companies',
        templateUrl: './companies.component.html',
        styleUrls: ['./companies.component.scss']
    })
], CompaniesComponent);
export { CompaniesComponent };
//# sourceMappingURL=companies.component.js.map