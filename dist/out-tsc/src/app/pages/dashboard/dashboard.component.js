import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
let DashboardComponent = class DashboardComponent {
    constructor(dialog, ServerUserService) {
        this.dialog = dialog;
        this.ServerUserService = ServerUserService;
        this.responseQuantityMonthAxisX = [];
        this.responseQuantityMonthAxisY = [];
        this.responseQuantityCarrierName = [];
        this.responseQuantityCarrierY = [];
        this.responseQuantityLockerName = [];
        this.responseQuantityLockerY = [];
        this.msgAddress = false;
        this.typeMsg = "";
        this.msgDir = "";
        this.arrayAddress = [];
    }
    ngOnInit() {
        if (localStorage.getItem("data") && localStorage.getItem("data") != 'undefined' && localStorage.getItem("data") != '') {
            let data = JSON.parse(localStorage.getItem("data"));
            if (data.result.id_user_type == 3) { //CLIENTE
                //this.id_consumer = localStorage.getItem("id_consumer");
                //this.id_User = localStorage.getItem("id_user");
                //this.consumer_code = localStorage.getItem("consumer_code");
                //this.checkedPack = data.direction_consumer.pref_low_height == 0 ? false : true;
            }
        }
        if (localStorage.getItem("id_user") && localStorage.getItem("id_user") != "" && localStorage.getItem("id_user") != "undefine") {
            this.id_User = localStorage.getItem("id_user");
        }
        if (localStorage.getItem("id_consumer") && localStorage.getItem("id_consumer") != "" && localStorage.getItem("id_consumer") != "undefine") {
            this.id_consumer = localStorage.getItem("id_consumer");
        }
        if (localStorage.getItem("consumer_code") && localStorage.getItem("consumer_code") != "" && localStorage.getItem("consumer_code") != "undefine") {
            let codeAux = localStorage.getItem("consumer_code");
            let maxStr = codeAux.length;
            let code1 = codeAux.substr(0, maxStr / 2);
            let code2 = codeAux.substr(maxStr / 2, maxStr);
            this.consumer_code = code1 + "-" + code2;
        }
        if (localStorage.getItem("pref_low_height") && localStorage.getItem("pref_low_height") != "" && localStorage.getItem("pref_low_height") != "undefine") {
            this.checkedPack = parseInt(localStorage.getItem("pref_low_height")) == 0 ? false : true;
        }
        this.data = {
            "language": localStorage.getItem('lenguage'),
            "year": 2020,
            "id_user": this.id_User,
            "id_consumer": this.id_consumer
        };
        this.ServerUserService.get_quantity_month(this.data).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                res.quantity_month.forEach(element => {
                    this.responseQuantityMonthAxisX.push(element.mes_package);
                    this.responseQuantityMonthAxisY.push(element.cant_package);
                });
                this.nameY = "Entregas del mes";
            }
            else {
                this.responseQuantityMonthAxisX = [];
                this.responseQuantityMonthAxisY = [];
            }
        });
        this.data = {
            "language": localStorage.getItem('lenguage'),
            "top": 3,
            "id_user": this.id_User,
            "id_consumer": this.id_consumer
        };
        this.ServerUserService.get_quantity_carrier(this.data).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                res.quantity_carrier.forEach(element => {
                    this.responseQuantityCarrierName.push(element.courier_name);
                    this.responseQuantityCarrierY.push(element.cant);
                });
            }
            else {
                this.responseQuantityCarrierName = [];
                this.responseQuantityCarrierY = [];
            }
        });
        this.data = {
            "language": localStorage.getItem('lenguage'),
            "top": 3,
            "id_user": this.id_User,
            "id_consumer": this.id_consumer
        };
        this.ServerUserService.get_quantity_locker(this.data).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                res.quantity_package_locker.forEach(element => {
                    this.responseQuantityLockerName.push(element.locker_name);
                    this.responseQuantityLockerY.push(element.cant);
                });
            }
            else {
                this.responseQuantityLockerName = [];
                this.responseQuantityLockerY = [];
            }
        });
        this.addressLocker_user();
        this.msgAddress = localStorage.getItem("add_address") ? true : false;
        this.typeMsg = localStorage.getItem("add_address");
        this.msgDir = localStorage.getItem("msgAddress");
    }
    closeMsg() {
        localStorage.removeItem("add_address");
        this.typeMsg = "";
        this.msgDir = "";
        this.msgAddress = false;
    }
    addressLocker_user() {
        this.arrayAddress = [];
        let data = {
            "language": localStorage.getItem('lenguage'),
            "id_user": this.id_User
        };
        this.ServerUserService.get_query_locker_user(data).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                res.result_return[0][1].forEach(element => {
                    this.arrayAddress.push({
                        id_locker: element.id_locker,
                        id_user_locker: element.id_user_locker,
                        lockerName: element.locker_name,
                        lockerAddress: element.locker_address,
                        userName: element.name_direction_user,
                        userAddress: element.name_direction_user_dos
                    });
                });
            }
        });
    }
    onDeleteLockerUser(id_user_locker) {
        const dialogRef = this.dialog.open(DialogContentDeleteAddress, {
            width: '400px',
            panelClass: 'myapp-no-padding-dialog'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result != "close") {
                let data = {
                    "language": localStorage.getItem('lenguage'),
                    "id_user_locker": id_user_locker
                };
                this.ServerUserService.delete_locker_user(data).subscribe(res => {
                    if (res.mensaje_return.ERROR == false) {
                        this.addressLocker_user();
                        this.typeMsg = "success";
                        localStorage.setItem("add_address", 'success');
                        this.msgDir = "¡La dirección ha sido eliminada con éxito!";
                    }
                    else {
                        this.typeMsg = "error";
                        localStorage.setItem("add_address", 'error');
                        this.msgDir = "Error al eliminar la dirección";
                    }
                    this.msgAddress = localStorage.getItem("add_address") ? true : false;
                    window.scroll(0, 0);
                });
            }
        });
    }
    openDialog(data = '') {
        let editData = data == '' ? false : true;
        const dialogRef = this.dialog.open(DialogContentAddAddress, { data: { data: data, edit: editData },
            width: '1000px',
            panelClass: 'myapp-no-padding-dialog' });
        dialogRef.afterClosed().subscribe(result => {
            if (result != "close") {
                setTimeout(() => {
                    this.addressLocker_user();
                    this.msgAddress = localStorage.getItem("add_address") ? true : false;
                    this.typeMsg = localStorage.getItem("add_address");
                    this.msgDir = localStorage.getItem("msgAddress");
                    window.scroll(0, 0);
                }, 3000);
            }
        });
    }
    onCheckedPackChanged(value) {
        let checked = value ? 1 : 0;
        this.data = {
            "id_consumer": this.id_User,
            "pref_low_height": checked
        };
        this.ServerUserService.update_update_data_user(this.data).subscribe(res => {
            if (res.mensaje_return.ERROR == true) {
                this.checkedPack = value;
            }
        });
    }
};
DashboardComponent = __decorate([
    Component({
        selector: 'app-cards',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.scss']
    })
], DashboardComponent);
export { DashboardComponent };
let DialogContentAddAddress = class DialogContentAddAddress {
    constructor(data, ServerUserService) {
        this.data = data;
        this.ServerUserService = ServerUserService;
        this.inputCode = false;
        this.errCode = false;
        this.list_address = [];
        this.myControl = new FormControl();
        this.options = ['One', 'Two', 'Three'];
    }
    ngOnInit() {
        this.nameForTheDirecction = this.data.data.userName;
        this.address_locker = this.data.data.lockerAddress;
        this.id_user_locker = this.data.data.id_user_locker;
        this.editData = this.data.edit;
        this.inputCode = this.address_locker ? true : false;
        this.id_User = localStorage.getItem("id_user");
        this.consumer_code = localStorage.getItem("consumer_code");
        this.disableBtn = this.editData ? true : false;
    }
    onAddDirection() {
        localStorage.removeItem("add_address");
        if (this.editData) {
            let data = {
                "language": localStorage.getItem('lenguage'),
                "id_user_locker": this.id_user_locker,
                "name_direction_user": this.nameForTheDirecction,
                "id_status": this.status
            };
            this.ServerUserService.put_update_locker_user(data).subscribe(res => {
                if (res.mensaje_return.ERROR == false) {
                    localStorage.setItem("add_address", 'success');
                    localStorage.setItem("msgAddress", "¡La dirección ha sido editada con éxito!");
                }
                else {
                    localStorage.setItem("add_address", 'error');
                    localStorage.setItem("msgAddress", "Error al editar la dirección");
                }
            });
        }
        else {
            if (this.disableBtn) {
                let data = {
                    "language": localStorage.getItem('lenguage'),
                    "name_direction_user": this.nameForTheDirecction,
                    "id_user": this.id_User,
                    "id_locker": this.id_locker,
                    "vivi_id": this.consumer_code,
                    "locker_code": this.locker_code
                };
                this.ServerUserService.post_add_locker_user(data).subscribe(res => {
                    if (res.mensaje_return.ERROR == false) {
                        localStorage.setItem("add_address", 'success');
                        localStorage.setItem("msgAddress", "¡La nueva dirección ha sido agregada con éxito!");
                        // location.reload();
                    }
                    else {
                        localStorage.setItem("add_address", 'error');
                        localStorage.setItem("msgAddress", "Error al agregar la nueva dirección");
                    }
                });
            }
        }
    }
    search_locker_address(filterValue) {
        let data = {
            "language": localStorage.getItem('lenguage'),
            "parametro": filterValue,
            "id_user": this.id_User
        };
        this.ServerUserService.get_list_locker_direccion(data).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                this.list_address = [];
                res.result_return[0][1].forEach(element => {
                    this.list_address.push({
                        id_company: element.id_company,
                        id_locker: element.id_locker,
                        id_locker_privacy: element.id_locker_privacy,
                        latitud: element.latitud,
                        locker_address: element.locker_address,
                        locker_code: element.locker_code,
                        locker_name: element.locker_name,
                        longitud: element.longitud,
                        require_invitation: element.require_invitation
                    });
                });
            }
            else {
                this.list_address = [];
            }
        });
    }
    onSelectedAddress(event) {
        // let privacy = event.option.value.id_locker_privacy;
        this.address_locker = event.option.value.locker_address;
        this.id_locker = event.option.value.id_locker;
        this.locker_code = event.option.value.locker_code;
        this.require_invitation = event.option.value.require_invitation;
        this.id_company = event.option.value.id_company;
        if (this.require_invitation == 0) { //No requiere codigo de invitacion
            this.disableBtn = true;
            this.inputCode = false;
        }
        else {
            this.disableBtn = false;
            this.inputCode = true;
        }
    }
    filterLockersList(event) {
        const filterValue = event.target.value;
        this.search_locker_address(filterValue);
    }
    onValidateInvitationCode(event) {
        let data = {
            "language": localStorage.getItem('lenguage'),
            "id_locker": this.id_locker,
            "id_company": this.id_company,
            "code_validation": this.invitationCode
        };
        this.ServerUserService.post_validar_code_company_locker(data).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                this.errCode = false;
                this.disableBtn = true;
            }
            else {
                this.errCode = true;
            }
        });
    }
};
DialogContentAddAddress = __decorate([
    Component({
        selector: 'dialog-content-modal',
        templateUrl: './modalAddress.component.html',
        styleUrls: ['./modal.component.scss']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], DialogContentAddAddress);
export { DialogContentAddAddress };
let DialogContentDeleteAddress = class DialogContentDeleteAddress {
    constructor(data) {
        this.data = data;
    }
};
DialogContentDeleteAddress = __decorate([
    Component({
        selector: 'dialog-content-modal',
        templateUrl: './modalDeleteAddress.component.html',
        styleUrls: ['./modal.component.scss']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], DialogContentDeleteAddress);
export { DialogContentDeleteAddress };
//# sourceMappingURL=dashboard.component.js.map