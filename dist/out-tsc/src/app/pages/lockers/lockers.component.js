import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LockersComponent = class LockersComponent {
    constructor(_router, ServerUserService) {
        this._router = _router;
        this.ServerUserService = ServerUserService;
        this.id = '';
        this.dataTable = [];
        this.arrayMarker = [];
        this.auxLockers = [];
    }
    ngOnInit() {
        this.typeUser = localStorage.getItem("user_type");
        if (localStorage.getItem("data") && localStorage.getItem("data") != 'undefined' && localStorage.getItem("data") != '') {
            let data = JSON.parse(localStorage.getItem("data"));
            if (data.result.user_type == "LOCATARIO") {
                this.idUserCompany = data.data_company.id_company;
            }
        }
        if (localStorage.getItem("id_user") && localStorage.getItem("id_user") != "" && localStorage.getItem("id_user") != "undefine") {
            this.id_User = localStorage.getItem("id_user");
        }
        if (this.typeUser == 2)
            this.get_lockers_admin();
        else if (this.typeUser == 6)
            this.get_lockers();
    }
    // onSeeLocker(id_locker){
    //   this._router.navigateByUrl("l-ad/locker/"+id_locker);
    // }
    get_lockers() {
        this.data = {
            "language": localStorage.getItem('lenguage'),
            "id_locker": 2,
            "id_company": this.idUserCompany,
            "id_user": this.id_User
        };
        this.ServerUserService.get_query_locker_company(this.data).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                res.locker_company[0][1].forEach(package_locker => {
                    this.dataTable.push({
                        id_locker: package_locker.locker_name,
                        address: package_locker.locker_address,
                        cant_doors: package_locker.cant_doors,
                        cant_module: package_locker.cant_module,
                        status: package_locker.status_locker,
                        type_loc: package_locker.locker_model_name,
                        privacy: package_locker.locker_privacy,
                        inv_code: package_locker.locker_code,
                        serial: package_locker.serial_locker,
                        see_locker: package_locker.id_locker
                    });
                });
                this.dataColumn = JSON.stringify(Object.keys(this.dataTable[0]));
                this.dataTableAux = JSON.stringify(this.dataTable);
            }
            else {
                this.dataTable = [];
                this.dataTableAux = "[{}]";
            }
        });
    }
    get_lockers_admin() {
        let count = 0;
        let data = {
            "language": localStorage.getItem('lenguage')
        };
        this.ServerUserService.get_query_locker_location(data).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                res.LOCKERS.forEach(res_lockers => {
                    res_lockers.INFO.forEach(element => {
                        this.auxLockers.push(element);
                        this.arrayMarker.push({
                            lat: element.COORDINATES.latitud,
                            lng: element.COORDINATES.longitud,
                            label: 'V',
                            draggable: false,
                            id_locker: element.id_locker,
                            locker_name: element.locker_name,
                            locker_address: element.COORDINATES.locker_address
                        });
                        this.dataTable.push({
                            id_locker: element.locker_name,
                            address: element.COORDINATES.locker_address,
                            cant_doors: element.door_quantity,
                            cant_module: element.module_quantity,
                            status: element.status_locker,
                            type_loc: element.locker_model_name,
                            serial: "*test",
                            privacy: "*test",
                            inv_code: "*test",
                            see_locker: element.id_locker,
                            register_date: '*01-8-19',
                            register: '*Raul Dominguez',
                            update_date: '*01-08-19'
                        });
                    });
                });
                this.arrayMarker = JSON.stringify(this.arrayMarker);
                this.arrayLockers = JSON.stringify(this.auxLockers);
                this.dataColumn = JSON.stringify(["id_locker", "address", "cant_doors", "cant_module", "status", "type_loc", "privacy", "inv_code", "serial", "register_date", "register", "update_date"]);
                this.dataTableAux = JSON.stringify(this.dataTable);
            }
        });
        // res.locker_company[0][1].forEach( package_locker => {
        //   this.dataTable.push({
        //     id_locker:     package_locker.locker_name, 
        //     address:       package_locker.locker_address,
        //     cant_doors:    package_locker.cant_doors,
        //     cant_module:   package_locker.cant_module,
        //     status:        package_locker.status_locker,
        //     type_loc:      package_locker.locker_model_name,
        //     serial:        package_locker.serial_locker,
        //     see_locker:    package_locker.id_locker,
        //     register_date: '01-8-19',
        //     register:      'Raul Dominguez',
        //     update_date:   '01-08-19',
        //     // icons:         'edit',
        //     // flag_hover:    0,
        //     // flag_edit:     0
        //   });
        // });
        // this.dataColumn =JSON.stringify(["id_locker","address","cant_doors","cant_module","status","type_loc","serial","register_date","register","update_date"]);   
        // this.dataTableAux = JSON.stringify(this.dataTable);
    }
};
LockersComponent = __decorate([
    Component({
        selector: 'app-lockers',
        templateUrl: './lockers.component.html',
        styleUrls: ['./lockers.component.scss']
    })
], LockersComponent);
export { LockersComponent };
//# sourceMappingURL=lockers.component.js.map