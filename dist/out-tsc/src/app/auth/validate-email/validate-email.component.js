import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ValidateEmailComponent = class ValidateEmailComponent {
    constructor(ServerUserService) {
        this.ServerUserService = ServerUserService;
        this.emailConfirmation = '';
        this.activeButton = false;
        this.buttonBackgorund = "";
    }
    ngOnInit() {
        if (localStorage.getItem("emailConfirmation") && localStorage.getItem("emailConfirmation") != "" && localStorage.getItem("emailConfirmation") != "undefine") {
            this.emailConfirmation = localStorage.getItem("emailConfirmation");
        }
    }
    SentLink() {
        if (this.emailConfirmation != '') {
            this.activeButton = true;
            this.buttonBackgorund = "buttonBackgorund";
            this.data = {
                language: localStorage.getItem('lenguage'),
                email_send: this.emailConfirmation
            };
            this.ServerUserService.post_resend_email_new_user(this.data).subscribe(res => {
                if (res.mensaje_return.ERROR == false) {
                    this.activeButton = false;
                    this.buttonBackgorund = "";
                }
            });
            setTimeout(() => {
                this.activeButton = false;
                this.buttonBackgorund = "";
            }, 30000);
        }
    }
};
ValidateEmailComponent = __decorate([
    Component({
        selector: 'app-validate-email',
        templateUrl: './validate-email.component.html',
        styleUrls: ['./validate-email.component.scss']
    })
], ValidateEmailComponent);
export { ValidateEmailComponent };
//# sourceMappingURL=validate-email.component.js.map