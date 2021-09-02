import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ForgotPasswordComponent = class ForgotPasswordComponent {
    constructor(ServerUserService) {
        this.ServerUserService = ServerUserService;
        this.user_email = '';
        this.tMsg = "";
        this.typeMsg = '';
        this.removeMsg = true;
        this.styles_input = '';
    }
    ngOnInit() {
    }
    validate() {
        this.removeMsg = true;
        if (this.user_email == '') {
            this.typeMsg = 'warning';
            this.tMsg = "message.forgot_passswor_warning";
            this.styles_input = "border-input-warning";
        }
        else {
            this.data = {
                language: localStorage.getItem('lenguage'),
                email_send: this.user_email
            };
            this.ServerUserService.post_forgot_password_user(this.data).subscribe(res => {
                if (res.mensaje_return.ERROR == false) {
                    this.typeMsg = 'success';
                    this.tMsg = "message.forgot_passswor_success";
                    this.styles_input = "border-input-success";
                }
                else {
                    if (res.mensaje_return.CODE == 1102) {
                        this.typeMsg = 'error';
                        this.tMsg = res.mensaje_return.ERROR_MENSAGGE;
                        this.styles_input = 'border-input-error';
                    }
                    if (res.mensaje_return.CODE == 1203) {
                        this.typeMsg = 'error';
                        this.tMsg = res.mensaje_return.ERROR_MENSAGGE;
                        this.styles_input = 'border-input-error';
                    }
                }
            });
        }
    }
};
ForgotPasswordComponent = __decorate([
    Component({
        selector: 'app-forgot-password',
        templateUrl: './forgot-password.component.html',
        styleUrls: ['./forgot-password.component.scss']
    })
], ForgotPasswordComponent);
export { ForgotPasswordComponent };
//# sourceMappingURL=forgot-password.component.js.map