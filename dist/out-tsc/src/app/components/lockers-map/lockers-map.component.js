import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let LockersMapComponent = class LockersMapComponent {
    constructor(ServerUserService, _router) {
        this.ServerUserService = ServerUserService;
        this._router = _router;
        this.zoom = 8; // google maps zoom level
        // initial center position for the map
        this.lat = 25.690290;
        this.lng = -100.315014;
        this.count = 0;
        this.arrayMarker = [];
    }
    ngOnInit() { }
    ngOnChanges(changes) {
        if (this.arrayMarkerMap && this.arrayListLockers) {
            this.arrAuxMarker = JSON.parse(this.arrayMarkerMap);
            this.arrayMarker = this.arrayMarkerMap;
            this.arrAuxLocker = JSON.parse(this.arrayListLockers);
            this.arrayLockers = JSON.parse(this.arrayListLockers);
        }
    }
    onSeeLocker(id_locker, name_locker) {
        this.ServerUserService.setIdLocker(id_locker);
        this._router.navigateByUrl("d-ad/locker/" + name_locker);
    }
    filterLockersList(event) {
        const filterValue = event.target.value;
        this.arrayMarker = this.arrAuxMarker.filter(i => i.locker_name.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0);
        this.arrayMarker = JSON.stringify(this.arrayMarker);
        this.arrayLockers = this.arrAuxLocker.filter(i => i.locker_name.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0);
    }
};
__decorate([
    Input()
], LockersMapComponent.prototype, "arrayMarkerMap", void 0);
__decorate([
    Input()
], LockersMapComponent.prototype, "arrayListLockers", void 0);
LockersMapComponent = __decorate([
    Component({
        selector: 'app-lockers-map',
        templateUrl: './lockers-map.component.html',
        styleUrls: ['./lockers-map.component.scss']
    })
], LockersMapComponent);
export { LockersMapComponent };
//# sourceMappingURL=lockers-map.component.js.map