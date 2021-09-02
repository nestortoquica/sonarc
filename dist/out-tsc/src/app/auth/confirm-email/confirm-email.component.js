import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ConfirmEmailComponent = class ConfirmEmailComponent {
    constructor(_router, route, ServerUserService) {
        this._router = _router;
        this.route = route;
        this.ServerUserService = ServerUserService;
    }
    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.validation_code = params.code;
        });
        this.ServerUserService.get_validate_email_user(this.validation_code).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                this._router.navigateByUrl("/");
                localStorage.removeItem("emailConfirmation");
            }
        });
    }
};
ConfirmEmailComponent = __decorate([
    Component({
        selector: 'app-confirm-email',
        template: `Holaaaaa`,
        styles: ['']
    })
], ConfirmEmailComponent);
export { ConfirmEmailComponent };
//# sourceMappingURL=confirm-email.component.js.map