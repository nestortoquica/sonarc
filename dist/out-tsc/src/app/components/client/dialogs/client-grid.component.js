import { __decorate, __param } from "tslib";
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
let ClientGrid = class ClientGrid {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.available = 0;
        this.occupied = 0;
        this.damaged = 0;
        this.open = 0;
    }
    ngOnInit() {
        this.data.status.forEach(e => {
            e == 'CERRADO' ? this.available++ :
                e == 'OCUPADO' ? this.occupied++ :
                    e == 'ABIERTO' ? this.open++ :
                        this.damaged++;
        });
    }
};
ClientGrid = __decorate([
    Component({
        selector: 'app-client-grid',
        templateUrl: './client-grid.component.html',
        styleUrls: ['./client-grid.component.scss']
    }),
    __param(1, Inject(MAT_DIALOG_DATA))
], ClientGrid);
export { ClientGrid };
//# sourceMappingURL=client-grid.component.js.map