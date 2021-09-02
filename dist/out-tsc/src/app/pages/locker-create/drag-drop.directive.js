import { __decorate } from "tslib";
import { Directive, HostBinding, HostListener, Output, EventEmitter } from "@angular/core";
let DragDropDirective = class DragDropDirective {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.files = new EventEmitter();
        this.background = "#fff";
    }
    onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = "#eee";
    }
    onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = "#fff";
    }
    onDrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#fff';
        let files = [];
        for (let i = 0; i < evt.dataTransfer.files.length; i++) {
            const file = evt.dataTransfer.files[i];
            const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
            const name = evt.dataTransfer.files[i].name;
            files.push({ file, url, name });
        }
        if (files.length > 0) {
            this.files.emit(files);
        }
    }
};
__decorate([
    Output()
], DragDropDirective.prototype, "files", void 0);
__decorate([
    HostBinding("style.background")
], DragDropDirective.prototype, "background", void 0);
__decorate([
    HostListener("dragover", ["$event"])
], DragDropDirective.prototype, "onDragOver", null);
__decorate([
    HostListener("dragleave", ["$event"])
], DragDropDirective.prototype, "onDragLeave", null);
__decorate([
    HostListener('drop', ['$event'])
], DragDropDirective.prototype, "onDrop", null);
DragDropDirective = __decorate([
    Directive({
        selector: '[appDragDrop]'
    })
], DragDropDirective);
export { DragDropDirective };
//# sourceMappingURL=drag-drop.directive.js.map