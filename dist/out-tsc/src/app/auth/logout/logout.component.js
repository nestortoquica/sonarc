import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LogoutComponent = class LogoutComponent {
    constructor(_router) {
        this._router = _router;
    }
    ngOnInit() {
        this._router.navigateByUrl("/");
        localStorage.clear();
    }
};
LogoutComponent = __decorate([
    Component({
        selector: 'app-logout',
        templateUrl: './logout.component.html',
        styleUrls: ['./logout.component.scss']
    })
], LogoutComponent);
export { LogoutComponent };
//# sourceMappingURL=logout.component.js.map