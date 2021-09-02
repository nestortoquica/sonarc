import { __decorate } from "tslib";
import { Component } from '@angular/core';
let FooterComponent = class FooterComponent {
    constructor() { }
    ngOnInit() {
        this.currentDate = new Date();
        this.year = this.currentDate.getFullYear();
    }
};
FooterComponent = __decorate([
    Component({
        selector: 'app-footer',
        templateUrl: './footer.component.html',
        styleUrls: ['./footer.component.scss']
    })
], FooterComponent);
export { FooterComponent };
//# sourceMappingURL=footer.component.js.map