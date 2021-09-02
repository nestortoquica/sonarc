import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
let CreateUserComponent = class CreateUserComponent {
    constructor(router, param, retail) {
        this.router = router;
        this.param = param;
        this.retail = retail;
        this.show = false;
        this.disabled = true;
        this.param.paramMap.subscribe(p => {
            this.user = JSON.parse(p.get('id'));
        });
        this.edit = document.location.href.split('/').pop();
    }
    ngOnInit() {
        this.lang = localStorage.getItem('lenguage').toLowerCase();
        this.company = localStorage.getItem('id_company');
        this.edit == 'edit' ? this.edit = true : this.edit = false;
        this.breakpoint = (window.innerWidth <= 900) ? 1 : 3;
        this.getUserTypes();
    }
    getUserTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.retail.getUserTypes(this.lang.toLowerCase());
            this.types = res.list_type_user;
            console.log(this.types);
        });
    }
    onResize(event) {
        this.breakpoint = (event.target.innerWidth <= 900) ? 1 : 3;
    }
    generate() {
        var result = [];
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 10; i++) {
            result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
        }
        this.show = true;
        this.password = result.join('');
        this.cpassword = this.password;
    }
    hidePassword() {
        this.show = !this.show;
    }
    back() {
        this.router.navigateByUrl('l-retail/user');
    }
    createUser() {
        return __awaiter(this, void 0, void 0, function* () {
            let body = {
                lenguage: this.lang,
                id_company: this.company,
                days_to_expire: 90,
                data_employee: [{
                        full_name: this.name,
                        email: this.email,
                        company_employee_id: this.id,
                        password: this.password,
                        id_type_employee: this.userType
                    }]
            };
            let res = yield this.retail.createUser(body);
            this.router.navigateByUrl('l-retail/user');
        });
    }
};
CreateUserComponent = __decorate([
    Component({
        selector: 'app-create-user',
        templateUrl: './create-user.component.html',
        styleUrls: ['./create-user.component.scss']
    })
], CreateUserComponent);
export { CreateUserComponent };
//# sourceMappingURL=create-user.component.js.map