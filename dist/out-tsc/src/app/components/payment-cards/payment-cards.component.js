import { __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
let PaymentCardsComponent = class PaymentCardsComponent {
    constructor(ServerUserService, _router, translate) {
        this.ServerUserService = ServerUserService;
        this._router = _router;
        this.translate = translate;
        this.slideSaveCard = false;
        this.errorMsg = '';
        this.err_msg = '';
        this.extraData = { name: '', address_city: '', address_line1: '', address_state: '' };
    }
    ngOnInit() {
        let data = JSON.parse(this.data);
        if (this.type == 'packages') {
            this.pay_packages = data.pay_packages;
            this.totalPay = data.totalPay;
            this.bandCredit = data.bandCredit;
        }
        else if (this.type == 'pay') {
            this.totalPay = data.amount;
        }
        let params = {
            "language": localStorage.getItem('lenguage'),
            "id_user": localStorage.getItem("id_user"),
        };
        this.ServerUserService.get_list_card(params).subscribe(res => {
            if (!res.mensaje_return.ERROR) {
                this.registeredCards = res.card_return[0][1];
            }
            else {
                console.log("Err:: ", res.mensaje_return.ERROR_MENSAGGE);
            }
        });
    }
    onStripeInvalid(error) {
        console.log('Validation Error', error);
    }
    onStripeError(error) {
        console.error('Stripe error', error);
    }
    setStripeToken(token) {
        if (this.type == 'packages') {
            let params = {
                "language": localStorage.getItem('lenguage'),
                "id_user": parseInt(localStorage.getItem("id_user")),
                "pay_balance": this.bandCredit == 'true' ? true : false,
                "device_session_id": token.id,
                "save_card": this.slideSaveCard,
                "pay_packages": this.pay_packages
            };
            this.service_pay_expired_packages(params);
        }
        else if (this.type == 'pay') {
            if (parseInt(this.totalPay) > 9) {
                let params = {
                    "language": localStorage.getItem('lenguage'),
                    "id_user": parseInt(localStorage.getItem("id_user")),
                    "device_session_id": token.id,
                    "amount": parseInt(this.totalPay),
                    "new_car": true,
                    "save_card": this.slideSaveCard,
                };
                this.service_balance_consumer(params);
            }
            else
                this.translate.get('message.amount').subscribe((text) => {
                    this.err_msg = text;
                });
        }
    }
    payment_registered_card(id) {
        if (this.type == 'packages') {
            let params = {
                "language": localStorage.getItem('lenguage'),
                "id_user": parseInt(localStorage.getItem("id_user")),
                "pay_balance": this.bandCredit == 'true' ? true : false,
                "id_card_user": parseInt(id),
                "pay_packages": this.pay_packages
            };
            this.service_pay_expired_packages(params);
        }
        else if (this.type == 'pay') {
            if (parseInt(this.totalPay) > 9) {
                let params = {
                    "language": localStorage.getItem('lenguage'),
                    "id_user": parseInt(localStorage.getItem("id_user")),
                    "amount": parseInt(this.totalPay),
                    "id_card_user": parseInt(id),
                    "new_car": false
                };
                this.service_balance_consumer(params);
            }
            else
                this.translate.get('message.amount').subscribe((text) => {
                    this.err_msg = text;
                });
        }
    }
    payAmount() {
        this.errorMsg = '';
        if (this.extraData.name != '' &&
            this.extraData.address_city != '' &&
            this.extraData.address_line1 != '' &&
            this.extraData.address_state != '') {
            this.stripeCard.createToken(this.extraData);
        }
        else
            this.errorMsg = "Falta información para realizar el pago";
    }
    service_pay_expired_packages(data) {
        this.ServerUserService.post_pay_expired_packages(data).subscribe(res => {
            if (!res.mensaje_return.ERROR) {
                this._router.navigateByUrl("/dashboard");
                window.scrollTo(0, 0);
                localStorage.setItem("add_address", 'success');
                this.translate.get('payments.successfully').subscribe((text) => {
                    localStorage.setItem("msgAddress", text);
                });
            }
            else {
                this._router.navigateByUrl("/dashboard");
                window.scrollTo(0, 0);
                localStorage.setItem("add_address", 'error');
                localStorage.setItem("msgAddress", res.mensaje_return.ERROR_MENSAGGE);
            }
        });
    }
    service_balance_consumer(data) {
        this.ServerUserService.post_charge_balance_consumer(data).subscribe(res => {
            if (!res.mensaje_return.ERROR) {
                window.location.reload();
                localStorage.setItem("type_msg", 'success');
                this.translate.get('payments.successfully').subscribe((text) => {
                    localStorage.setItem("text_msg", text);
                });
            }
            else {
                localStorage.setItem("type_msg", 'error');
                localStorage.setItem("text_msg", res.mensaje_return.ERROR_MENSAGGE);
            }
        });
    }
};
__decorate([
    Input()
], PaymentCardsComponent.prototype, "data", void 0);
__decorate([
    Input()
], PaymentCardsComponent.prototype, "type", void 0);
__decorate([
    ViewChild('stripeCard', { static: false })
], PaymentCardsComponent.prototype, "stripeCard", void 0);
PaymentCardsComponent = __decorate([
    Component({
        selector: 'app-payment-cards',
        templateUrl: './payment-cards.component.html',
        styleUrls: ['./payment-cards.component.scss']
    })
], PaymentCardsComponent);
export { PaymentCardsComponent };
//# sourceMappingURL=payment-cards.component.js.map