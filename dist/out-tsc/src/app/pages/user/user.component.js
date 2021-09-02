import { __decorate } from "tslib";
import { Component } from '@angular/core';
let UserComponent = class UserComponent {
    constructor(ServerUserService) {
        this.ServerUserService = ServerUserService;
        this.dataTable = [];
    }
    ngOnInit() {
        this.dataTabSysUser();
        this.dataTabAssociates();
        this.dataTabUser();
    }
    convertDate(date) {
        if (date != '') {
            let temp = date.split('T');
            let hora = temp[1].split('.');
            if (temp.length > 0 && temp[0]) {
                temp = temp[0].split('-');
                return temp[2] + '-' + temp[1] + '-' + temp[0]; //+" "+hora[0];
            }
        }
        return "00-00-00 00:00:00";
    }
    dataTabSysUser() {
        let data = {
            "language": localStorage.getItem('lenguage'),
            "type_user": "admin"
        };
        this.ServerUserService.get_query_consumer_user_system(data).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                this.dataTable = [];
                res.result_retrun[0][1].forEach(element => {
                    this.dataTable.push({
                        name: element.first_name + " " + element.surname,
                        email: element.email,
                        type_user: element.id_user_type,
                        status: element.nombre_status,
                        register: "*Antonio Lopez",
                        register_date: this.convertDate(element.registration_date),
                        update_date: this.convertDate(element.update_date),
                        logs: "",
                        icons: 'edit',
                        flag_hover: 0,
                        flag_edit: 0
                    });
                });
                this.dataColumnSysUser = JSON.stringify(["name", "email", "type_user", "status", "register", "register_date", "update_date", "logs", "icons"]);
                this.dataTableSysUser = JSON.stringify(this.dataTable);
            }
            else {
                this.dataTable = [];
                this.dataTable.push({
                    name_event: 'NO RECORDS'
                });
            }
        });
    }
    dataTabAssociates() {
        let data = {
            "language": localStorage.getItem('lenguage'),
            "type_user": "asociaddo"
        };
        this.ServerUserService.get_query_consumer_user_system(data).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                this.dataTable = [];
                res.result_retrun[0][1].forEach(element => {
                    this.dataTable.push({
                        name: element.first_name + " " + element.surname,
                        email: "*ehenderson@hotmail.com",
                        company: element.company_name,
                        status: element.nombre_status,
                        register: "*Antonio Lopez",
                        register_date: this.convertDate(element.registration_date),
                        update_date: this.convertDate(element.update_date),
                        logs: "",
                        icons: 'edit',
                        flag_hover: 0,
                        flag_edit: 0
                    });
                });
                this.dataColumnAssociates = JSON.stringify(["name", "email", "company", "status", "register", "register_date", "update_date", "logs", "icons"]);
                this.dataTableAssociates = JSON.stringify(this.dataTable);
            }
            else {
                this.dataTable = [];
                this.dataTable.push({
                    name_event: 'NO RECORDS'
                });
            }
        });
    }
    dataTabUser() {
        this.dataTable = [];
        let data = {
            "language": localStorage.getItem('lenguage')
        };
        this.ServerUserService.get_query_consumer_user(data).subscribe(res => {
            if (res.mensaje_return.ERROR == false) {
                res.result_consumer.forEach(element => {
                    this.dataTable.push({
                        name: "*Ethan Henderson",
                        address: "*Calle prueba #123 col. nombre prueba, cetro co ",
                        email: "*ehenderson@hotmail.com",
                        phone: element.main_tlf,
                        vivi_id: "*247032",
                        status: element.nombre_status,
                        register_date: this.convertDate(element.registration_date),
                        password: "Cambiar",
                        logs: ""
                    });
                });
                this.dataColumnUser = JSON.stringify(Object.keys(this.dataTable[0]));
                this.dataTableUser = JSON.stringify(this.dataTable);
            }
            else {
                this.dataTable = [];
                this.dataTable.push({
                    name_event: 'NO RECORDS'
                });
            }
        });
    }
};
UserComponent = __decorate([
    Component({
        selector: 'app-user',
        templateUrl: './user.component.html',
        styleUrls: ['./user.component.scss']
    })
], UserComponent);
export { UserComponent };
//# sourceMappingURL=user.component.js.map