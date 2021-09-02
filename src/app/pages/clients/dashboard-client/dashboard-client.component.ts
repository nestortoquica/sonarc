import { Component, OnInit,Input } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { Router } from '@angular/router';
import { ServerUserService } from '../../../services/server-user.service';
import { TranslateService } from '@ngx-translate/core';
import { LogLocker } from 'src/app/models/log_locker_model';
import { RetailService } from 'src/app/services/retail.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.scss']
})
export class DashboardClientComponent implements OnInit {
  dataChart: any;
  months: any = []
  local

  consumerCount;
  mostActiveLockers=[];

  lockers: LogLocker[] = [];
  locks: []|any;
  locker_id;
  data;
  columns;
  ubication:any;
  coords
  hoverCoords = '';
  tempLockers: []|any;

  constructor(
    private retailService: RetailService,
    private router: Router,
    private component: AppComponent,
  ) {}

  ngOnInit() { 
    this.local = JSON.parse(localStorage.getItem("data"));
    this.getLockersTable();
    //this.getChartLine();
    //this.getConsumerCount();
    // this.getMostActiveLocker();
    this.columns = ['lockerID', 'location' , 'totalDeliveries', 'total', 'doors', 'available', 'status', 'serial']
  }

  async getChartLine(){
    let data = {
      language: localStorage.getItem('lenguage'),
      year: new Date().getFullYear(),
      id_company: this.local.data_company.id_company,
      token: localStorage.getItem('token')
    }
    this.dataChart = await this.retailService.getQuantityMonth(data);
    this.dataChart.forEach(m=>{
      this.months.push(m.mes_package);
    })
    this.months = this.months.join(',');
    this.dataChart = JSON.stringify(this.dataChart);
    
  }

  async getMostActiveLocker(){
    let data = {
      language: localStorage.getItem('lenguage'),
      year: new Date().getFullYear(),
      id_company: this.local.data_company.id_company,
      token: localStorage.getItem('token')
    }
    return await this.retailService.getMostActiveLocker(data);
  }

  async getConsumerCount(){
    let data = {
      language: localStorage.getItem('lenguage'),
      id_company: this.local.data_company.id_company,
      token: localStorage.getItem('token')
    }
    this.consumerCount = await this.retailService.getConsumerCompanyCount(data);

  }

  navigate(l){
    let gridLocker = []
    localStorage.setItem('id_locker', l.id_locker)
    localStorage.setItem('locker_name', l.locker_name)
    this.locks.forEach((e:any)=>{
      if (e.id_locker==l.id_locker) {
        localStorage.setItem('lat', e.latitud)
        localStorage.setItem('lng', e.longitud)
        localStorage.setItem('address', e.locker_address)
        e.MODULE.forEach(m=>{
          m.template_module.forEach(t=>{
          })
        })
      }
    })
    // this.router.navigateByUrl(`l-retail/locker/${l.id_locker}`, {skipLocationChange: true})
  }

  async getLockersTable(){
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let data = {
      language: localStorage.getItem("lenguage"),
      id_company: this.local.data_company.id_company,
      month_actuality: month+1,
      last_month: month,
      year: year,
      token: localStorage.getItem('token')
    }
    let grid = [];
    this.locks = await this.retailService.getLockersRetail(data);    
    this.coords = []
    this.mostActiveLockers = await this.getMostActiveLocker()
    this.locks.forEach(e => {
      this.coords.push({
        lat: Number(e.latitud), 
        lng: Number(e.longitud), 
        locker_name: e.locker_name,
        address: e.locker_address,
        lockerID: e.id_locker
      })
    });
    
    this.locks[0].MODULE.forEach((e, i)=>{
      grid.push(e.template_module)
    })
    // localStorage.setItem('grid', JSON.stringify(grid))
    this.locks.forEach((element: any, i) => {
      this.lockers.push({
        id: element.id_locker,
        lockerID: element.locker_name, 
        location: 'view',
        totalDeliveries: element.PACKAGE[0].DELIVERY[0].package_month_actuality_delivery,
        total: element.PACKAGE[0].BY_COLLECT[0].result_delivery_to_collect,
        doors: element.door_total,
        available: element.compartments_available,
        status: element.name_status,
        serial: element.serial_locker,
        deliveries: element.PACKAGE[0].DELIVERY[0].difference_percentage_delivery,
        lat: element.latitud,
        lng: element.longitud,
        address: element.locker_address
      })
    })    
    this.data = JSON.stringify(this.lockers);
  }

  hoverMarker(e){
    this.hoverCoords = JSON.stringify(e.coords)
  }

  outMarker(){
    this.hoverCoords = JSON.stringify({lat:'', lng:''})
  }

  async seeLocker(locker, i){
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let data = {
      language: localStorage.getItem("lenguage"),
      id_company: this.local.data_company.id_company,
      month_actuality: month,
      last_month: month-1,
      year: year,
      token: localStorage.getItem('token')
    }
    let grid = [];
    this.tempLockers = await this.retailService.getLockersRetail(data);
    this.tempLockers[i].MODULE.forEach((e, i)=>{
      grid.push(e.template_module)
    })
    localStorage.setItem('grid', JSON.stringify(grid))
    this.component.setId(locker.id);
    localStorage.setItem('id_locker', locker.lockerID)
    localStorage.setItem('lat', locker.lat)
    localStorage.setItem('lng', locker.lng)
    localStorage.setItem('address', locker.address)
    localStorage.setItem('locker_name', locker.locker_name)
    this.router.navigateByUrl(`l-retail/locker/${locker.lockerID}`, {skipLocationChange: true})

  }
}
