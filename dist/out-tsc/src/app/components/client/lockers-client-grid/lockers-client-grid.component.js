import { __awaiter, __decorate } from "tslib";
import { Component, Input, ViewEncapsulation } from '@angular/core';
let LockersClientGridComponent = class LockersClientGridComponent {
    constructor(ServerUserService, datepipe, platform, retailService) {
        this.ServerUserService = ServerUserService;
        this.datepipe = datepipe;
        this.platform = platform;
        this.retailService = retailService;
        this.arrayNodeLocker = [];
        this.tt_open = 0;
        this.tt_occupied = 0;
        this.tt_available = 0;
        this.tt_damaged = 0;
        this.count_door = 1;
        this.locker_info = [];
        this.module = [];
        this.col = 0;
        this.height = 0;
        this.modulos = 0;
        this.device = false;
        this.safari = false;
        this.temp = [];
    }
    ngOnInit() {
        this.safari = this.platform.SAFARI;
        if (this.platform.ANDROID || this.platform.IOS) {
            this.device = true;
        }
        else
            this.device = false;
        this.grid = JSON.parse(localStorage.getItem('grid'));
        this.grid.forEach((e, i) => {
            e.forEach((l) => {
                if (l.class === "NULL") {
                    l.text = "null";
                }
                else if (l.class === "SCREEN") {
                    l.text = "SCREEN";
                }
                else {
                    l.text = this.count_door++;
                }
            });
            this.module.push({ id: i + 1, locker: e });
        });
        this.getGrid();
        // this.module = [
        //   {id: 1, locker: [{text: 1, rows: 12, cols: 6, class: Status.CERRADO}]},
        //   {id: 2, locker: [{text: 2, rows: 5, cols: 3, class: Status.CERRADO},
        //                    {text: 3, rows: 5, cols: 3, class: Status.CERRADO}, 
        //                    {text: 4, rows: 7, cols: 6, class: Status.CERRADO}]},
        //   {id: 3, locker: [{text: 5, rows: 5, cols: 3, class: Status.CERRADO}, 
        //                    {text: 6, rows: 5, cols: 3, class: Status.OCUPADO}, 
        //                    {text: 7, rows: 7, cols: 6, class: Status.CERRADO}]},
        //   {id: 4, locker: [{text: 8, rows: 5, cols: 3, class: Status.CERRADO}, 
        //                    {text: 9, rows: 5, cols: 3, class: Status.OCUPADO}, 
        //                    {text: 10, rows: 7, cols: 6, class: Status.CERRADO}]},
        //   {id: 5, locker: [{text: 11, rows: 5, cols: 3, class: Status.SCREEN}, 
        //                    {text: 12, rows: 5, cols: 3, class: Status.ABIERTO},
        //                    {text: 0, rows: 2, cols: 6, class: ''} ,
        //                    {text: 13, rows: 5, cols: 6, class: Status.FALLO}]},
        //   {id: 6, locker: [{text: 14, rows: 5, cols: 2, class: Status.CERRADO}, 
        //                    {text: 15, rows: 5, cols: 2, class: Status.CERRADO}, 
        //                    {text: 16, rows: 5, cols: 2, class: Status.OCUPADO},
        //                    {text: 0, rows: 2, cols: 6, class: ''} ,
        //                    {text: 17, cols: 6, rows: 5, class: Status.CERRADO}]},
        //   {id: 7, locker: [{text: 18, rows: 5, cols: 2, class: Status.CERRADO},
        //                    {text: 19, rows: 5, cols: 2, class: Status.FALLO}, 
        //                    {text: 20, rows: 5, cols: 2, class: Status.CERRADO}, 
        //                    {text: 0, rows: 2, cols: 6, class: ''} ,
        //                    {text: 21, cols: 6, rows: 5, class: Status.CERRADO}]}
        // ];
    }
    ngOnChanges() {
        if (this.cStatus && this.modulo) {
            this.cStatus = JSON.parse(this.cStatus);
            this.modulo = JSON.parse(this.modulo);
            this.cStatus.forEach(e => {
                e.name_status == 'CERRADO' ? this.tt_available = e.quantity :
                    e.name_status == 'ABIERTO' ? this.tt_open = e.quantity :
                        e.name_status == 'FALLO' ? this.tt_damaged = e.quantity :
                            e.name_status == 'OCUPADO' ? this.tt_occupied = e.quantity :
                                null;
            });
        }
    }
    itemToolInfo(m, l) {
        let date = new Date();
        let d = this.datepipe.transform(date, 'dd/MM/y');
        let info = `Order Number: ${l.order_number} \n Order Ikea: ${l.tracking_number} \n Status Comparment: ${l.class}`;
        return info;
    }
    getGrid() {
        return __awaiter(this, void 0, void 0, function* () {
            let params = {
                language: localStorage.getItem('lenguage').toLowerCase(),
                id_locker: localStorage.getItem('id_locker'),
                token: localStorage.getItem('token')
            };
            let lockerGrid = yield this.retailService.getLockersGrid(params);
            lockerGrid.modulo_status.forEach((e, i) => {
                e.DOOR.forEach(d => {
                    this.module.forEach((e, i) => {
                        e.locker.forEach((l) => {
                            if (l.text == d.door_number) {
                                l.class = d.GRID.class;
                                if (d.PACKAGE[0].order_number) {
                                    l.order_number = Number(d.PACKAGE[0].order_number);
                                    l.tracking_number = d.PACKAGE[0].tracking_number;
                                }
                            }
                        });
                    });
                });
            });
        });
    }
};
__decorate([
    Input()
], LockersClientGridComponent.prototype, "modulo", void 0);
__decorate([
    Input()
], LockersClientGridComponent.prototype, "cStatus", void 0);
LockersClientGridComponent = __decorate([
    Component({
        selector: 'app-lockers-client-grid',
        templateUrl: './lockers-client-grid.component.html',
        styleUrls: ['./lockers-client-grid.component.scss'],
        encapsulation: ViewEncapsulation.None
    })
], LockersClientGridComponent);
export { LockersClientGridComponent };
//# sourceMappingURL=lockers-client-grid.component.js.map