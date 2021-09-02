import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpParams } from "@angular/common/http";
let ServerUserService = class ServerUserService {
    constructor(__http) {
        this.__http = __http;
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                // 'timeout': `${120000}`
            })
        };
        //this.baseurl = "https://bkn-ssl.vivipost.com"; 
        this.baseurl = "https://bkn-ssl-prod.vivipost.com";
        //this.baseurl = "http://10.1.50.37:5001";  
        localStorage.removeItem('url_cam_event');
    }
    getdataCamera(value) {
        this.dataCamera = JSON.parse(localStorage.getItem('dataCamera'));
        return this.dataCamera[value];
    }
    setdataCamera(value) {
        this.dataCamera = value;
        localStorage.setItem("dataCamera", JSON.stringify(value));
    }
    getCoordenate() {
        return this.coordenate;
    }
    setCoordenate(coordenate) {
        this.coordenate = coordenate;
    }
    getdataCameraEvnet() { return localStorage.getItem('url_cam_event'); }
    setdataCameraEvent(value) { localStorage.setItem("url_cam_event", value); }
    post_validate_user_password(data) {
        this.temp = this.baseurl + "/server/user/validate-user-password";
        return this.__http.post(this.temp, JSON.stringify(data), this.httpOptions)
            .pipe(retry(1), catchError(this.errorHandl));
        // this.temp = this.url + "/server/user/validate-user-password";
        // let headers = new Headers({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Accept': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
        // return this.__http.post( this.temp,"",options ).map( res => res.json());
    }
    get_validate_email_user(code) {
        this.temp = this.baseurl + "/server/user/validate-email-user/" + code;
        return this.__http.get(this.temp, code)
            .pipe(retry(1), catchError(this.errorHandl));
    }
    get_list_card(data) {
        this.temp = this.baseurl + "/server/user/list-card";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    update_update_data_user(data) {
        this.temp = this.baseurl + "/server/user/update-data-user";
        return this.__http.put(this.temp, data, this.httpOptions)
            .pipe(retry(1), catchError(this.errorHandl));
    }
    get_query_balance_consumer(data) {
        this.temp = this.baseurl + "/server/user/query-balance-consumer";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    post_log_package_user(data) {
        this.temp = this.baseurl + "/server/package/log-package-user";
        return this.__http.post(this.temp, data, this.httpOptions)
            .pipe(retry(1), catchError(this.errorHandl));
    }
    post_pay_expired_packages(data) {
        this.temp = this.baseurl + "/server/package/pay-expired-packages";
        return this.__http.post(this.temp, data, this.httpOptions)
            .pipe(retry(1), catchError(this.errorHandl));
    }
    get_query_template_locker_module(data) {
        this.temp = this.baseurl + "/server/locker/query-template-locker-module";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    get_query_door_locker_grid(data) {
        this.temp = this.baseurl + "/server/locker/query-door-locker-grid";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    post_reboot_unit(data) {
        this.temp = this.baseurl + "/server/locker/reboot-unit";
        return this.__http.post(this.temp, JSON.stringify(data), this.httpOptions)
            .pipe(retry(1), catchError(this.errorHandl));
    }
    get_query_locker_location(data) {
        this.temp = this.baseurl + "/server/locker/query-locker-location";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    get_query_consumer_direction(data) {
        this.temp = this.baseurl + "/server/user/query-consumer-direction";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    get_query_consumer_user(data) {
        this.temp = this.baseurl + "/server/user/query-consumer";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    get_query_consumer_user_system(data) {
        this.temp = this.baseurl + "/server/user/query-user";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    get_quantity_status(data) {
        this.temp = this.baseurl + "/server/package/quantity-status";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    get_query_consumer(data) {
        this.temp = this.baseurl + "/server/package/query-consumer";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    get_list_cam_locker(data) {
        this.temp = this.baseurl + "/server/locker/cam/list-cam-locker";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    get_cam_check_Event(data) {
        this.temp = this.baseurl + "/server/locker/cam/check-event";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    get_query_locker_company(data) {
        this.temp = this.baseurl + "/server/locker/query-locker-company";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    get_quantity_company(data) {
        this.temp = this.baseurl + "/server/package/quantity-company";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    getData() {
        return this.data;
    }
    setData(data) {
        this.data = data;
        //localStorage.setItem("data", JSON.stringify(this.data));
    }
    getIdLocker() {
        this.id_locker = JSON.parse(localStorage.getItem('id_locker'));
        return this.id_locker;
    }
    setIdLocker(id_locker) {
        this.id_locker = id_locker;
        localStorage.setItem("id_locker", JSON.stringify(id_locker));
    }
    get_query_status_compartments_quantity(data) {
        this.temp = this.baseurl + "/server/locker/query-status-compartments-quantity";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    /* GRAFICAS*/
    get_quantity_month(data) {
        this.temp = this.baseurl + "/server/package/quantity-month";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    get_quantity_last_days(data) {
        this.temp = this.baseurl + "/server/package/quantity-last-days";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    get_quantity_carrier(data) {
        this.temp = this.baseurl + "/server/package/quantity-carrier";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    get_quantity_locker(data) {
        this.temp = this.baseurl + "/server/package/quantity-locker";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    get_list_lenguaje(data) {
        this.temp = this.baseurl + "/server/system/list-lenguaje";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    post_send_validate_number_phone(data) {
        this.temp = this.baseurl + "/server/system/notification/send-validate-number-phone";
        return this.__http.post(this.temp, JSON.stringify(data), this.httpOptions)
            .pipe(retry(1), catchError(this.errorHandl));
    }
    post_validate_code(data) {
        this.temp = this.baseurl + "/server/system/notification/validate-code";
        return this.__http.post(this.temp, JSON.stringify(data), this.httpOptions)
            .pipe(retry(1), catchError(this.errorHandl));
    }
    post_register_new_user(data) {
        this.temp = this.baseurl + "/server/user/register-new-user";
        return this.__http.post(this.temp, JSON.stringify(data), this.httpOptions)
            .pipe(retry(1), catchError(this.errorHandl));
    }
    post_validate_user(data) {
        this.temp = this.baseurl + "/server/user/validate-user";
        return this.__http.post(this.temp, JSON.stringify(data), this.httpOptions)
            .pipe(retry(1), catchError(this.errorHandl));
    }
    get_package_metric_locker(data) {
        this.temp = this.baseurl + "/server/package/package-metric-locker";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    post_resend_email_new_user(data) {
        this.temp = this.baseurl + "/server/user/resend-email-new-user";
        return this.__http.post(this.temp, JSON.stringify(data), this.httpOptions)
            .pipe(retry(1), catchError(this.errorHandl));
    }
    /* LOGIN */
    post_forgot_password_user(data) {
        this.temp = this.baseurl + "/server/user/forgot-password-user";
        return this.__http.post(this.temp, JSON.stringify(data), this.httpOptions)
            .pipe(retry(1), catchError(this.errorHandl));
    }
    post_reset_password_user(data) {
        this.temp = this.baseurl + "/server/user/reset-password-user";
        return this.__http.post(this.temp, JSON.stringify(data), this.httpOptions)
            .pipe(retry(1), catchError(this.errorHandl));
    }
    get_query_company(data) {
        this.temp = this.baseurl + "/server/company/query-company";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    get_log_user(data) {
        this.temp = this.baseurl + "/server/user/log-user";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    //----------- modal address
    get_query_locker_user(data) {
        this.temp = this.baseurl + "/server/locker/query-locker-user";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    delete_locker_user(data) {
        this.temp = this.baseurl + "/server/locker/delete-locker-user";
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: data
        };
        return this.__http.delete(this.temp, options)
            .pipe(retry(1), catchError(this.errorHandl));
    }
    put_update_locker_user(data) {
        this.temp = this.baseurl + "/server/locker/update-locker-user";
        return this.__http.put(this.temp, data, this.httpOptions)
            .pipe(retry(1), catchError(this.errorHandl));
    }
    post_add_locker_user(data) {
        this.temp = this.baseurl + "/server/locker/add-locker-user";
        return this.__http.post(this.temp, data, this.httpOptions)
            .pipe(retry(1), catchError(this.errorHandl));
    }
    get_list_locker_direccion(data) {
        this.temp = this.baseurl + "/server/locker/list-locker-direccion";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    post_validar_code_company_locker(data) {
        this.temp = this.baseurl + "/server/locker/validar-code-company-locker";
        return this.__http.post(this.temp, data, this.httpOptions)
            .pipe(retry(1), catchError(this.errorHandl));
    }
    get_expired_package(data) {
        this.temp = this.baseurl + "/server/package/expired-package";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    get_query_payment_company(data) {
        this.temp = this.baseurl + "/server/company/query-payment-company";
        let params = new HttpParams();
        Object.keys(data).forEach(function (item) {
            params = params.set(item, data[item]);
        });
        return this.__http.get(this.temp, { params }).pipe(retry(1), catchError(this.errorHandl));
    }
    post_charge_balance_consumer(data) {
        this.temp = this.baseurl + "/server/user/charge-balance-consumer";
        return this.__http.post(this.temp, data, this.httpOptions)
            .pipe(retry(1), catchError(this.errorHandl));
    }
    errorHandl(error) {
        // let errorMessage;
        // if(error.error instanceof ErrorEvent) {
        //   errorMessage = error.error.message;// Get client-side error
        // } else {
        //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;// Get server-side error
        // }
        return throwError(error);
    }
};
ServerUserService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ServerUserService);
export { ServerUserService };
//# sourceMappingURL=server-user.service.js.map