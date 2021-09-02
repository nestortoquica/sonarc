import { __decorate } from "tslib";
import { Component } from '@angular/core';
let NotificationsComponent = class NotificationsComponent {
    constructor(ServerUserService) {
        this.ServerUserService = ServerUserService;
    }
    ngOnInit() {
        this.get_notifications();
    }
    get_notifications() {
        let data = {
            "language": localStorage.getItem('lenguage'),
            "id_user": localStorage.getItem("id_user")
        };
        this.ServerUserService.post_log_package_user(data).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                this.arrayNotications = res.result_list[0][1];
            }
        });
    }
};
NotificationsComponent = __decorate([
    Component({
        selector: 'app-notifications',
        templateUrl: './notifications.component.html',
        styleUrls: ['./notifications.component.scss']
    })
], NotificationsComponent);
export { NotificationsComponent };
//# sourceMappingURL=notifications.component.js.map