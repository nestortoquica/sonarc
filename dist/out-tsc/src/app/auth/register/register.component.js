import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { environment } from "../../../environments/environment";
let RegisterComponent = class RegisterComponent {
    constructor(ServerUserService, _router, translate) {
        this.ServerUserService = ServerUserService;
        this._router = _router;
        this.translate = translate;
        this.name = "";
        this.apell = "";
        this.email = "";
        this.password = "";
        this.confirmPassword = "";
        this.check_terms = false;
        this.typeMsg = '';
        this.removeMsg = true;
        this.styles_input = '';
        this.code_cell = "";
        this.cell = "";
        this.validation_code = "";
        this.buttonConfirmar = true;
        this.validate_code = "";
        this.disabledFields = false;
        this.validateNumber = false;
        this.emailValido = false;
        this.public_key_recaptcha = environment.public_key_recaptcha;
        this.recaptchaCheck = false;
    }
    ngOnInit() {
        this.currentDate = new Date();
        this.year = this.currentDate.getFullYear();
    }
    resolved(captchaResponse) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
        this.recaptchaCheck = captchaResponse != null ? true : false;
    }
    validate() {
        let check = false;
        this.removeMsg = true;
        if (this.name == '' || this.apell == '' || !this.name.match(/^\w+[a-zA-Z]+$/) || !this.apell.match(/^\w+[a-zA-Z]+$/)) {
            this.typeMsg = 'error';
            this.translate.get('message.register_first_name_error').subscribe((text) => {
                this.errorNames = text;
            });
            check = true;
        }
        else {
            this.errorNames = '';
        }
        if (this.email == '' || !this.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/)) {
            this.typeMsg = 'error';
            this.translate.get('message.error_email').subscribe((text) => {
                this.errorEmail = text;
            });
            check = true;
        }
        else {
            this.errorEmail = '';
        }
        if (this.password == '' || this.confirmPassword == '' || this.password != this.confirmPassword) {
            this.typeMsg = 'error';
            this.translate.get('message.register_password_no_match').subscribe((text) => {
                this.errorPassword = text;
            });
            check = true;
        }
        else {
            this.errorPassword = '';
        }
        if (!this.password.match(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/)) {
            this.typeMsg = 'error';
            this.translate.get('message.regex_pass').subscribe((text) => {
                this.errorPassword = text;
            });
        }
        else {
            this.errorPassword = '';
        }
        if (this.validateNumber == false) {
            this.typeMsg = 'error';
            this.translate.get('message.unconfirmed_phone').subscribe((text) => {
                this.errorCode = text;
            });
            check = true;
        }
        else {
            this.errorCode = '';
        }
        if (check == false) {
            let terms = this.check_terms ? 1 : 0;
            this.params = {
                "language": localStorage.getItem('lenguage'),
                "surname": this.apell,
                "first_name": this.name,
                "user": this.email,
                "password": this.password,
                "number_phone": this.code_cell + "" + this.cell,
                "accept_term_condition": terms,
                "id_user_type": 3,
                "id_registration_method": 1
            };
            this.ServerUserService.post_register_new_user(this.params).subscribe(res => {
                if (res.mensaje_return.ERROR == false) {
                    localStorage.setItem("emailConfirmation", this.email);
                    this._router.navigateByUrl("/validate-email");
                }
            });
        }
    }
    buttonValidate() {
        if (this.code_cell != "" && this.cell != "" && /^[0-9]+$/gm.test(this.cell) && this.validateNumber == false) {
            this.params = { "validate_number_phone": this.code_cell + "" + this.cell };
            this.ServerUserService.post_send_validate_number_phone(this.params).subscribe(res => {
                if (res.mensaje_return.ERROR == false) {
                    this.validate_code = res.validate_code;
                    this.buttonConfirmar = false;
                }
            });
        }
    }
    buttonConfirm() {
        if (this.code_cell != "" && this.cell != "" && /^[0-9]+$/gm.test(this.cell) && this.validation_code != "" && /^[0-9]+$/gm.test(this.validation_code) && this.validateNumber == false) {
            this.buttonConfirmar = true;
            setTimeout(() => {
                this.buttonConfirmar = false;
            }, 5000);
            if (this.validate_code == this.validation_code) {
                this.params = {
                    "validate_number_phone": this.code_cell + "" + this.cell,
                    "validate_code": this.validation_code
                };
                this.ServerUserService.post_validate_code(this.params).subscribe(res => {
                    if (res.mensaje_return.ERROR == false) {
                        this.validateNumber = true;
                        document.getElementById("btnValidationCode").style.display = "none";
                        document.getElementById("checkVal").style.display = "block";
                        this.errorCode = '';
                    }
                });
            }
            else {
                this.typeMsg = 'error';
                this.translate.get('message.code_invalid').subscribe((text) => {
                    this.errorCode = text;
                });
                this.errorCode = "";
            }
        }
    }
    focusOutFunction() {
        if (this.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/)) {
            this.params = {
                "language": localStorage.getItem('lenguage'),
                "user": this.email
            };
            this.ServerUserService.post_validate_user(this.params).subscribe(res => {
                if (res.mensaje_return.ERROR == true) {
                    this.emailValido = false;
                    this.errorEmail = "*" + res.mensaje_return.ERROR_MENSAGGE;
                    document.getElementById("email").focus();
                    this.name = this.email;
                }
                else {
                    this.emailValido = true;
                }
            });
        }
        else {
            this.translate.get('message.error_email').subscribe((text) => {
                this.errorEmail = text;
            });
        }
    }
};
RegisterComponent = __decorate([
    Component({
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.scss']
    })
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map