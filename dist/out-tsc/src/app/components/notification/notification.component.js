import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let NotificationComponent = class NotificationComponent {
    constructor() {
        this.remove = false;
    }
    ngOnInit() {
    }
    ngOnChanges() {
        this.stylesForNotification();
    }
    stylesForNotification() {
        if (this.type === "info") {
            this.classNofitication = "styles-info";
        }
        else if (this.type === "success") {
            this.classNofitication = "styles-success";
        }
        else if (this.type === "error") {
            this.classNofitication = "styles-error";
        }
        else if (this.type === "warning") {
            this.classNofitication = "styles-warning";
        }
    }
};
__decorate([
    Input()
], NotificationComponent.prototype, "type", void 0);
__decorate([
    Input()
], NotificationComponent.prototype, "message", void 0);
__decorate([
    Input()
], NotificationComponent.prototype, "remove", void 0);
NotificationComponent = __decorate([
    Component({
        selector: 'app-notification',
        templateUrl: './notification.component.html',
        styleUrls: ['./notification.component.scss']
    })
], NotificationComponent);
export { NotificationComponent };
//# sourceMappingURL=notification.component.js.map