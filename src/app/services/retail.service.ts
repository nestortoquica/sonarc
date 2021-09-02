import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RetailService {
  private baseUrl: string = 'https://bkn-ssl.vivipost.com'
  //private baseUrl: string = 'https://bkn-ssl-prod.vivipost.com';
  //private baseUrl: string = 'http://localhost:5001';

  constructor(private http: HttpClient) { }

  async getQuantityMonth(params):Promise<any>{
    let url = this.baseUrl + '/server/package/quantity-month';
    let data:any = await this.http.get(url, {params: params}).toPromise();
    return data.quantity_month;
  }

  async getLogSystem(params):Promise<any>{
    let url = this.baseUrl + '/server/company/log-system';
    return await this.http.get(url, {params: params}).toPromise();
  }

  async getConsumerCompanyCount(params):Promise<number>{
    let url = this.baseUrl + '/server/company/query-consumer-company-count';
    let data:any = await this.http.get(url, {params: params}).toPromise();
    return data.result_return.cant_customer;
  }

  async getMostActiveLocker(params){
    let url = this.baseUrl + '/server/package/quantity-locker-company';
    let data:any = await this.http.get(url, {params: params}).toPromise();
    return data.return_result[0][1];
  }

  async getLockersRetail(params){
    let url = this.baseUrl + '/server/locker/query-locker-retail';
    let data:any = await this.http.get(url, {params: params}).toPromise();
    if(!data.mensaje_return.ERROR)
      return data.return_result[0][1];
    else
      return [];
  }

  async getLockersGrid(params) {
    let url = this.baseUrl + '/server/locker/query-door-locker-grid';
    return await this.http.get(url, {params: params}).toPromise();
  }

  async getOrders(params){        
    let url = this.baseUrl + '/server/package/query-package-company'
    let data: any = await this.http.get(url, {params: params}).toPromise();  
    return data;  
    //if(data.return_result){
    //return data.return_result[0][1];
    //}
    //return data
  }

  async getAllOrders(params){
    let url = this.baseUrl + '/server/package/query-package-company'
    let data: any = await this.http.get(url, {params: params}).toPromise();        
    if(!data.mensaje_return.ERROR)
      return data.return_result[0][1];
    else
      return [];
  }

  async getUser(params){
    return await this.http.get(this.baseUrl+'/server/company/query-user', {params: params}).toPromise();
  }

  async getAllEmployeesAdmin(params){
    return await this.http.get(this.baseUrl+'/server/company/query-admin', {params: params}).toPromise();
  }

  async getAllEmployees(params){
    return await this.http.get(this.baseUrl+'/server/company/query-employee', {params: params}).toPromise();
  }

  async deleteEmployee(params){
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: params
    }
    return await this.http.delete(this.baseUrl+'/server/company/delete-employee', options).toPromise();
  }

  async deleteEmployeeAdmin(params){
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: params
    }
    return await this.http.delete(this.baseUrl+'/server/company/delete-admin', options).toPromise();
  }

  async changeClientEmail(body) {
    let url = this.baseUrl + '/server/package/change-client-email';
    return await this.http.post(url, body).toPromise();
  }

  async createUser(body) {
    let url = this.baseUrl + '/server/company/register-employee';
    return await this.http.post(url, body).toPromise();
  }

  async udpateEmployee(body) {
    let url = this.baseUrl + '/server/company/update-employee';
    return await this.http.put(url, body).toPromise();
  }

  // todo Aun no está funcionando
  async editUser(body, id){
    let url = this.baseUrl + '/'+id;
    return await this.http.put(url, body).toPromise();
  }


  async getMetrics(params){
    let url = this.baseUrl + '/server/package/package-metric-locker'
    let data: any = await this.http.get(url, {params: params}).toPromise();
    return data.result_metric;
  }

  async camList(params){
    return await this.http.get(this.baseUrl+'/server/locker/cam/list-cam-locker', {params: params}).toPromise()
  }

  async camEvent(params){
    return await this.http.get(this.baseUrl+'/server/locker/cam/check-event', {params: params}).toPromise()
  }

  async getUserTypes(params){
    return await this.http.get(this.baseUrl+'/server/company/list-type-employee', {params: params}).toPromise()
  }

  async updateExpirationDate(params){
    return await this.http.put(this.baseUrl+'/server/package/update-expiration-date', params).toPromise();
  }


}
