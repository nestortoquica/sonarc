import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
let ClientUserComponent = class ClientUserComponent {
    constructor(retailService) {
        this.retailService = retailService;
    }
    ngOnInit() {
        this.columns = ['fullName', 'email', 'userType', 'employeId', 'activeDays', 'expires', 'master', 'actions'];
        this.data = JSON.stringify(this.users);
        this.getUsers();
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            this.users = [];
            let data = {
                lenguage: localStorage.getItem('lenguage').toLowerCase(),
                id_company: localStorage.getItem('id_company'),
                token: localStorage.getItem('token')
            };
            let res = yield this.retailService.getAllEmployees(data);            
            res.result_return.forEach(e => {
                let register = new Date(e.date_register);
                let update = new Date(e.date_update);
                let activeDays = register.getDate() - update.getDate();
                this.users.push({
                    fullName: e.full_name,
                    email: e.email,
                    employeId: e.company_employee_id,
                    activeDays: activeDays,
                    expires: e.date_expire_password,
                    master: Math.round(Math.random() * 1000000),
                    actions: ['far fa-edit', 'far fa-trash-alt'],
                    id: e.id_company_employee,
                    userType: { id: e.id_type_employee, name: e.name_type_employee }
                });
            });
            this.data = JSON.stringify(this.users);
        });
    }
};
ClientUserComponent = __decorate([
    Component({
        selector: 'app-client-user',
        templateUrl: './client-user.component.html',
        styleUrls: ['./client-user.component.scss']
    })
], ClientUserComponent);
export { ClientUserComponent };
//# sourceMappingURL=client-user.component.js.map