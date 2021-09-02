import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PayBalanceComponent = class PayBalanceComponent {
    constructor(ServerUserService) {
        this.ServerUserService = ServerUserService;
        this.payment = '0';
        this.disableBtn = true;
        this.err = false;
        this.msg = false;
    }
    ngOnInit() {
        this.step1 = true;
        let params = {
            "language": localStorage.getItem('lenguage'),
            "id_user": localStorage.getItem("id_user")
        };
        this.ServerUserService.get_query_balance_consumer(params).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                let aux = res.balance_consumer.split(" ");
                this.credit = parseInt(aux[0]);
            }
        });
        if (localStorage.getItem("type_msg")) {
            this.msg = true;
            this.type_msg = localStorage.getItem("type_msg");
            this.text_msg = localStorage.getItem("text_msg");
        }
    }
    onSelectedPay(e) {
        this.payment = e.target.value;
        this.err = this.disableBtn = parseInt(this.payment) > 9 ? false : true;
    }
    onSelectedQuantity() {
        this.err = this.disableBtn = parseInt(this.payment) > 9 ? false : true;
    }
    onNextStepPay() {
        this.pay_data = JSON.stringify({ "amount": this.payment });
        this.step1 = false;
        this.step2 = true;
    }
};
PayBalanceComponent = __decorate([
    Component({
        selector: 'app-pay-balance',
        templateUrl: './pay-balance.component.html',
        styleUrls: ['./pay-balance.component.scss']
    })
], PayBalanceComponent);
export { PayBalanceComponent };
//# sourceMappingURL=pay-balance.component.js.map