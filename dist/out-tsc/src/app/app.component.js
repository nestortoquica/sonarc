import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AppComponent = class AppComponent {
    constructor(translate, router) {
        this.translate = translate;
        this.router = router;
        this.lenguage = 'en';
        if (localStorage.getItem("lenguage") && localStorage.getItem("lenguage") != "" && localStorage.getItem("lenguage") != "undefine") {
            this.lenguage = localStorage.getItem("lenguage");
        }
        translate.setDefaultLang(this.lenguage.toLowerCase());
        localStorage.setItem("lenguage", this.lenguage);
    }
    setId(id) { this.id = id; }
    getId() { return this.id; }
    move() {
        clearTimeout(this.time);
        this.time = setTimeout(() => { this.navigate(); }, 600000);
    }
    navigate() {
        localStorage.clear();
        this.router.navigateByUrl('login');
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map