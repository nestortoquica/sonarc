import { __awaiter, __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
let RetailService = class RetailService {
    constructor(http) {
        this.http = http;
        //private baseUrl: string = 'https://bkn-ssl.vivipost.com'
        this.baseUrl = 'https://bkn-ssl-prod.vivipost.com';
    }
    getQuantityMonth(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.baseUrl + '/server/package/quantity-month';
            let data = yield this.http.get(url, { params: params }).toPromise();
            return data.quantity_month;
        });
    }
    getConsumerCompanyCount(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.baseUrl + '/server/company/query-consumer-company-count';
            let data = yield this.http.get(url, { params: params }).toPromise();
            return data.result_return.cant_customer;
        });
    }
    getMostActiveLocker(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.baseUrl + '/server/package/quantity-locker-company';
            let data = yield this.http.get(url, { params: params }).toPromise();
            return data.return_result[0][1];
        });
    }
    getLockersRetail(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.baseUrl + '/server/locker/query-locker-retail';
            let data = yield this.http.get(url, { params: params }).toPromise();
            if (!data.mensaje_return.ERROR)
                return data.return_result[0][1];
            else
                return [];
        });
    }
    getLockersGrid(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.baseUrl + '/server/locker/query-door-locker-grid';
            return yield this.http.get(url, { params: params }).toPromise();
        });
    }
    getOrders(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.baseUrl + '/server/package/query-package-company';
            let data = yield this.http.get(url, { params: params }).toPromise();
            return data;
            //if(data.return_result){
            //return data.return_result[0][1];
            //}
            //return data
        });
    }
    getAllOrders(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.baseUrl + '/server/package/query-package-company';
            let data = yield this.http.get(url, { params: params }).toPromise();            
            if (!data.mensaje_return.ERROR)
                return data.return_result[0][1];
            else
                return [];
        });
    }
    getAllEmployees(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.http.get(this.baseUrl + '/server/company/query-employee', { params: params }).toPromise();
        });
    }
    deleteEmployee(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                }),
                body: params
            };
            return yield this.http.delete(this.baseUrl + '/server/company/delete-employee', options).toPromise();
        });
    }
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.baseUrl + '/server/company/register-employee';
            return yield this.http.post(url, body).toPromise();
        });
    }
    // todo Aun no está funcionando
    editUser(body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.baseUrl + '/' + id;
            return yield this.http.put(url, body).toPromise();
        });
    }
    getMetrics(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.baseUrl + '/server/package/package-metric-locker';
            let data = yield this.http.get(url, { params: params }).toPromise();
            return data.result_metric;
        });
    }
    camList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.http.get(this.baseUrl + '/server/locker/cam/list-cam-locker', { params: params }).toPromise();
        });
    }
    camEvent(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.http.get(this.baseUrl + '/server/locker/cam/check-event', { params: params }).toPromise();
        });
    }
    getUserTypes(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.http.get(this.baseUrl + '/server/company/list-type-employee', { params: params }).toPromise();
        });
    }
    updateExpirationDate(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.http.put(this.baseUrl + '/server/package/update-expiration-date', params).toPromise();
        });
    }
};
RetailService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], RetailService);
export { RetailService };
//# sourceMappingURL=retail.service.js.map