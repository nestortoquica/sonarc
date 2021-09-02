import { __awaiter, __decorate, __param } from "tslib";
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
let ConfirmDelete = class ConfirmDelete {
    constructor(data, retailService) {
        this.data = data;
        this.retailService = retailService;
    }
    deleteUser() {
        return __awaiter(this, void 0, void 0, function* () {
            let params = {
                leng: localStorage.getItem('lenguage').toLowerCase(),
                id_company: Number(localStorage.getItem('id_company')),
                id_employee: Number(this.data),
                token: localStorage.getItem('token')
            };
            localStorage.setItem('deleted', '1');
            yield this.retailService.deleteEmployee(params);
        });
    }
};
ConfirmDelete = __decorate([
    Component({
        selector: 'confirm-delete',
        templateUrl: './confirm-delete.html'
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], ConfirmDelete);
export { ConfirmDelete };
//# sourceMappingURL=confirm-delete.js.map