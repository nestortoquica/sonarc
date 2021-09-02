import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let MsgComponent = class MsgComponent {
    constructor() {
        this.msg = false;
    }
    ngOnInit() {
        this.msg = this.type_msg == '' ? false : true;
    }
    closeMsg() {
        localStorage.removeItem("type_msg");
        localStorage.removeItem("text_msg");
        this.msg = false;
    }
};
__decorate([
    Input()
], MsgComponent.prototype, "type_msg", void 0);
__decorate([
    Input()
], MsgComponent.prototype, "text_msg", void 0);
MsgComponent = __decorate([
    Component({
        selector: 'app-msg',
        templateUrl: './msg.component.html',
        styleUrls: ['./msg.component.scss']
    })
], MsgComponent);
export { MsgComponent };
//# sourceMappingURL=msg.component.js.map