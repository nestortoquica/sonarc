import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ClientProfileComponent = class ClientProfileComponent {
    constructor(translate) {
        this.translate = translate;
        this.password = true;
        this.type = 'password';
    }
    ngOnInit() {
        this.data = JSON.parse(localStorage.getItem('data'));
        this.email = this.data.data_company.email;
        this.company = this.data.data_company.company_name;
        this.fname = this.data.data_company.first_name;
        this.sname = this.data.data_company.surname;
        this.userType = this.data.data_company.user_type;
        this.address = 'Av. del Peñón 355, Moctezuma 2da Secc, Venustiano Carranza, 15530 Ciudad de México, CDMX';
    }
    hidePassword() {
        this.password = !this.password;
        this.type = this.password ? 'password' : 'text';
    }
    submit() {
        this.lang ? this.translate.use(this.lang.toLowerCase()) : null;
        this.lang ? localStorage.setItem('lenguage', this.lang) : null;
    }
};
ClientProfileComponent = __decorate([
    Component({
        selector: 'app-client-profile',
        templateUrl: './client-profile.component.html',
        styleUrls: ['./client-profile.component.scss']
    })
], ClientProfileComponent);
export { ClientProfileComponent };
//# sourceMappingURL=client-profile.component.js.map