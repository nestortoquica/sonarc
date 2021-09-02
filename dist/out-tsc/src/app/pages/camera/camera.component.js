import { __decorate } from "tslib";
import { Component } from '@angular/core';
let CameraComponent = class CameraComponent {
    constructor(route, ServerUserService, sanitizer) {
        this.route = route;
        this.ServerUserService = ServerUserService;
        this.sanitizer = sanitizer;
        this.date = '';
        this.time_start = '';
        this.time_end = '';
        this.dataTable = [];
        this.dataTableAux = "[{}]";
        this.url_cam_event = '';
        this.dataColumn = [];
        this.removeMsg = true;
    }
    ngOnInit() {
        this.route.params.subscribe((params) => {
            let cam = params.camera - 1;
            this.dataResultCamera = this.ServerUserService.getdataCamera(cam);
            this.camera = this.dataResultCamera.monitor_name;
        });
    }
    onclickEvent() {
        this.url_cam_event = this.ServerUserService.getdataCameraEvnet();
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url_cam_event);
    }
    queryDataCamEvent() {
        this.removeMsg = true;
        if (this.date == '' || this.time_start == '' || this.time_end == '') {
            /*
             * Mostrar error de que no debe quedar ningun campo vacio para poder consultar
             */
        }
        else {
            this.date_start = Date.parse(this.date + ' ' + this.time_start);
            this.date_end = Date.parse(this.date + ' ' + this.time_end);
            this.data = {
                lenguage: "en",
                ip_address: this.dataResultCamera.ip_address,
                date_start: this.date_start,
                date_end: this.date_end,
                cam: this.dataResultCamera.id
            };
            this.ServerUserService.get_cam_check_Event(this.data).subscribe(res => {
                if (res.result_event.length) {
                    this.dataTable = [];
                    res.result_event.forEach(event => {
                        this.dataTable.push({
                            name: event.name,
                            start_time: event.start_time,
                            end_time: event.end_time,
                            duration: event.length,
                            see_event: event.url_view
                        });
                    });
                }
                else {
                    this.dataTable = [];
                    this.dataTable.push({
                        name_event: 'NO RECORDS'
                    });
                }
                this.dataColumn = JSON.stringify(Object.keys(this.dataTable[0]));
                this.dataTableAux = JSON.stringify(this.dataTable);
            });
        }
    }
};
CameraComponent = __decorate([
    Component({
        selector: 'app-camera',
        templateUrl: './camera.component.html',
        styleUrls: ['./camera.component.scss']
    })
], CameraComponent);
export { CameraComponent };
//# sourceMappingURL=camera.component.js.map