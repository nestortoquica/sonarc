import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let GoogleMapsComponent = class GoogleMapsComponent {
    constructor(ServerUserService) {
        this.ServerUserService = ServerUserService;
        // google maps zoom level
        this.zoom = 9;
        this.markers = [];
        this.id_locker = new EventEmitter();
    }
    ngOnInit() {
    }
    ngOnChanges(changes) {
        if (this.longitud && this.latitud) {
            this.lng = parseFloat(this.longitud);
            this.lat = parseFloat(this.latitud);
        }
        if (this.coords) {
            this.markers = JSON.parse(this.coords);
        }
        if (this.markers[0]) {
            this.markers[0].lng = Number(this.longitud);
            this.markers[0].lat = Number(this.latitud);
        }
    }
    clickedMarker(label, index) {
        this.id_locker.emit(this.markers[index]['id_locker']);
    }
    mapClicked($event) {
    }
    markerDragEnd(m, $event) {
        console.log('dragEnd', m, $event);
    }
};
__decorate([
    Input()
], GoogleMapsComponent.prototype, "longitud", void 0);
__decorate([
    Input()
], GoogleMapsComponent.prototype, "latitud", void 0);
__decorate([
    Input()
], GoogleMapsComponent.prototype, "coords", void 0);
__decorate([
    Output()
], GoogleMapsComponent.prototype, "id_locker", void 0);
GoogleMapsComponent = __decorate([
    Component({
        selector: 'app-google-maps',
        templateUrl: './google-maps.component.html',
        styleUrls: ['./google-maps.component.scss']
    })
], GoogleMapsComponent);
export { GoogleMapsComponent };
//# sourceMappingURL=google-maps.component.js.map