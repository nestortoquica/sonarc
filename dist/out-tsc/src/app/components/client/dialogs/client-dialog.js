import { __decorate, __param } from "tslib";
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
let ClientSign = class ClientSign {
    constructor(dialogRef, data, downloadService, sanitizer) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.downloadService = downloadService;
        this.sanitizer = sanitizer;
    }
    ngOnInit() {
        // this.downloadFile = this.data.image.split('https://').join('')
        const blob = new Blob([this.data.image], { type: 'img/png' });
        this.downloadFile = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    }
};
ClientSign = __decorate([
    Component({
        selector: 'app-client-sign',
        templateUrl: './client-sign.html'
    }),
    __param(1, Inject(MAT_DIALOG_DATA))
], ClientSign);
export { ClientSign };
//# sourceMappingURL=client-dialog.js.map