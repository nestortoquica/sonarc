import { Component, OnInit, ɵConsole, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServerUserService } from '../../../services/server-user.service';
import { Platform } from '@angular/cdk/platform';
import { AppComponent } from 'src/app/app.component';
import { RetailService } from 'src/app/services/retail.service';
import jsPDF from 'jspdf';
// import { Workbook } from 'exceljs'
// import * as fs from 'file-saver'
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { LOGO } from 'src/assets/const';

@Component({
  selector: 'app-locker-detail',
  templateUrl: './locker-client-detail.component.html',
  styleUrls: ['./locker-client-detail.component.scss']
})
export class LockerClientDetailComponent implements OnInit {
  
  id: number;
  zoom: number = 8;  // esto deberia ser un servicio
  lat: number
  url='';
  lng: number
  arrayMarker:any=[];  
  dataChart;
  count: number = 0;  
  address: string = '';
  id_locker:number;
  data = [];
  dataGrid;
  cStatus;
  modulo;
  responseQuantityCarrierName=[];
  responseQuantityCarrierY=[];
  dataTable=[];
  dataTableAux;
  dataColumn;
  dataMonth = []
  hashLocker;
  longitud: number=0;
  latitud: number=0;
  carrierNames = [];
  carrierY = [];
  package_statusNames = [];
  package_statusY = [];
  package_sizeNames = [];
  package_sizeY = [];
  typeUser
  usage = 0;
  m: number = 0;
  l: number = 0;
  xl: number = 0;
  xxl: number = 0;
  xxxl: number = 0;
  locker: string = '';
  camera = false;
  cameraName = '';
  time_start: Date;
  time_end: Date;
  date_stamp: Date;
  dtime_start: Date;
  dtime_end: Date;
  ddate_stamp: Date;
  stime_start: Date;
  stime_end: Date;
  sdate_stamp: Date;
  device = false;
  safari = false;
  day;
  lang;
  metrics;
  months;
  datar;
  compSizes
  cameras;
  singleCam;
  time
  user_type
  cantReturn
  text: any = {};
  general: any = {};
  deliveries: any = {};
  adate = new Date(); // Fecha Actual
  msdate = new Date(this.adate.setMonth(this.adate.getMonth() - 1)); // Fecha actual menos un mes
  mfdate = new Date()
  maxDate = new Date()  
  sdate = '0000000000000'; // Fecha actual menos un anno
  fdate = new Date();
  avg_time;
  collection_success_rate;
  monthsArrayEN:any = ["January","February","Marzo","April","May","June","July","August","September","October","November","Diciembre"]
  monthsArrayES:any = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
  constructor(
    private route: ActivatedRoute, 
    private _router: Router,
    private ServerUserService: ServerUserService,
    private component: AppComponent,
    private platform: Platform,
    private retailService: RetailService,
    private translate: TranslateService,
    private http: HttpClient
    ) {
    route.paramMap.subscribe(params=> {
      this.locker = params.get('id')
    })
    if (platform.SAFARI) {
      this.safari = true;
    } else this.safari = false;
    if (this.platform.ANDROID || this.platform.IOS) {
      this.device = true;
    } else this.device = false
  }

  ngOnInit() {    
    this.user_type = localStorage.getItem('user_type');    
    this.translate.get('lockers').subscribe(res=>{
      this.text = res
    })
    this.translate.get('general').subscribe(res=>{
      this.general = res
    })
    this.translate.get('deliveries').subscribe(res=>{
      this.deliveries = res
    })
    this.lang = localStorage.getItem('lenguage')
    this.day = new Date();
    this.day.setMonth(this.day.getMonth()-12);
    this.getTable();
    this.getMetrics()
    this.getLockerGrid();
    this.getMap();
    this.component.getId()?
    this.id = this.component.getId():
    this.id = Number(localStorage.getItem('id_locker'));
    this.dataColumn = ['order', 'tracking', 'email', 'employeId', 'doors', 'compartment', 'status', 'inLocker', 'expired', 'pickedUp', 'signature']
    this.address = localStorage.getItem('address')
    this.getCams();
  }

  downloadPDF(){
    const doc = new jsPDF();
    doc.addImage(LOGO, 'png', 150, 10, 30, 15)
    doc.fromHTML('<h1>Metrics</h1>', 10, 13)
    doc.fromHTML(localStorage.getItem('locker_name'), 10, 10)
    let sdate = this.msdate.getDate() +'/'+ (this.msdate.getMonth()+1) + '/' + this.msdate.getFullYear()
    let fdate = this.mfdate.getDate() +'/'+ (this.mfdate.getMonth()+1) + '/' + this.mfdate.getFullYear()
    doc.fromHTML(sdate.toString(), 50, 10)
    doc.fromHTML('-', 70, 10)
    doc.fromHTML(fdate.toString(), 75, 10)
    let y = 40
    doc.line(5, 35, 60, 35)
    doc.line(5, 45, 60, 45)
    doc.line(5, 110, 60, 110)
    doc.line(5, 35, 5, 110)
    doc.line(60, 35, 60, 110)
    doc.line(36, 45, 35, 110)
    doc.fromHTML('<h3>'+this.text.usage_month+'</h3>', 10, 30)
    doc.line(5, 125, 70, 125)
    doc.line(5, 135, 70, 135)
    doc.line(5, 125, 5, 200)
    doc.line(70, 125, 70, 200)
    doc.line(5, 200, 70, 200)
    doc.line(43, 135, 43, 200)
    doc.fromHTML('<h3>'+this.text.orders_returned+'</h3>', 10, 120)
    this.months.split(',').forEach((element, i) => {
      y = y+5;
      doc.fromHTML(element, 10, y)
      doc.fromHTML(element, 10, y+90)
      doc.fromHTML(this.dataMonth[i].toString(), 45, y)
      doc.fromHTML(this.cantReturn[i].toString(), 50, y+90)
    });

    y = 37
    doc.line(85, 35, 175, 35)
    doc.line(85, 42, 175, 42)
    doc.line(85, 35, 85, 66)
    doc.line(175, 35, 175, 66)
    doc.line(85, 66, 175, 66)
    doc.line(120, 42, 120, 66)
    doc.fromHTML('<h3>'+this.text.orders_delivered+'</h3>', 90, 30)
    JSON.parse(this.compSizes).forEach(element => {
      y = y + 5;
      doc.fromHTML(element.compartment_name, 95, y)
      doc.fromHTML(element.cantidad.toString(), 135, y)
    });

    doc.line(85, 75, 130, 75)
    doc.line(85, 82, 130, 82)
    doc.line(85, 90, 130, 90)
    doc.line(85, 75, 85, 90)
    doc.line(130, 75, 130, 90)
    doc.fromHTML('<h3>'+this.general.totalCustomers+'</h3>', 90, 70)
    doc.fromHTML(this.metrics[0][1][0].total_user_locker.toString(), 110, 80)
    doc.fromHTML(this.general.customers+':', 90, 80)
    
    doc.line(85, 95, 135, 95)
    doc.line(85, 102, 135, 102)
    doc.line(85, 110, 135, 110)
    doc.line(85, 95, 85, 110)
    doc.line(135, 95, 135, 110)
    doc.fromHTML('<h3>'+this.text.use_total+'</h3>', 90, 90)
    doc.fromHTML(this.general.customers+':', 90, 100)
    doc.fromHTML(this.metrics[0][1][0].total_locker_usage.toString(), 110, 100)

    doc.line(85, 125, 140, 125)
    doc.line(85, 132, 140, 132)
    doc.line(85, 140, 140, 140)
    doc.line(85, 125, 85, 140)
    doc.line(140, 125, 140, 140)
    doc.fromHTML('<h3>'+this.text.returning+'</h3>', 90, 120)
    doc.fromHTML(this.general.customers+':', 90, 130)
    doc.fromHTML(this.metrics[0][1][0].user_recurrent.toString(), 110, 130)

    doc.line(85, 145, 155, 145)
    doc.line(85, 152, 155, 152)
    doc.line(85, 170, 155, 170)
    doc.line(85, 145, 85, 170)
    doc.line(155, 145, 155, 170)
    doc.fromHTML('<h3>'+this.text.used_size+'</h3>', 90, 140)
    y = 145
    this.metrics[1][1].forEach(element=>{
      y = y + 5
      doc.fromHTML(element, 90, y)
    })
    
    doc.line(85, 175, 145, 175)
    doc.line(85, 182, 145, 182)
    doc.line(85, 190, 145, 190)
    doc.line(85, 175, 85, 190)
    doc.line(145, 175, 145, 190)
    doc.fromHTML('<h3>'+this.deliveries.deliver_today+'</h3>', 90, 170)
    doc.fromHTML(this.deliveries.orders+':', 90, 180)
    doc.fromHTML(this.metrics[0][1][0].total_delivery_today.toString(), 105, 180)
    
    doc.line(85, 195, 145, 195)
    doc.line(85, 202, 145, 202)
    doc.line(85, 210, 145, 210)
    doc.line(85, 195, 85, 210)
    doc.line(145, 195, 145, 210)
    doc.fromHTML('<h3>'+this.text.average_delivery+'</h3>', 90, 190)
    doc.fromHTML('03:40', 90, 200)
    
    doc.line(5, 205, 65, 205)
    doc.line(5, 212, 65, 212)
    doc.line(5, 220, 65, 220)
    doc.line(5, 205, 5, 220)
    doc.line(65, 205, 65, 220)
    doc.fromHTML('<h3>'+this.text.average_collection+'</h3>', 10, 200)
    doc.fromHTML(this.metrics[0][1][0].avg_time.toString(), 10, 210)
    
    doc.line(85, 215, 145, 215)
    doc.line(85, 222, 145, 222)
    doc.line(85, 230, 145, 230)
    doc.line(85, 215, 85, 230)
    doc.line(145, 215, 145, 230)
    doc.fromHTML('<h3>'+this.text.collection_success+'</h3>', 90, 210)
    doc.fromHTML(this.metrics[0][1][0].collection_success_rate+'%', 90, 220)
    doc.fromHTML(this.deliveries.orders, 100, 220)
    
    doc.line(5, 225, 65, 225)
    doc.line(5, 232, 65, 232)
    doc.line(5, 240, 65, 240)
    doc.line(5, 225, 5, 240)
    doc.line(65, 225, 65, 240)
    doc.fromHTML('<h3>'+this.text.success_rate+'</h3>', 10, 220)
    doc.fromHTML('13%', 10, 230)
    doc.save('metrics.pdf');
  }

  downloadExcel(){
    // const workbook = new Workbook();
    // const worksheet = workbook.addWorksheet('test')
    // worksheet.addRow([])
    // workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
    //   const blob = new Blob([data], {type: 'xls'});
    //   fs.saveAs(blob, 'test.xls')
    // })
  }

  async getTable(){
    let lang = localStorage.getItem('lenguage').toLowerCase();        
    let id = localStorage.getItem('id_locker');
    let company = localStorage.getItem('id_company');
   
    let data = {
      language: lang,
      id_locker: parseInt(id),
      id_company: parseInt(company),
      date_start : Date.parse(this.sdate.toString()),
      date_end : Date.parse(this.fdate.toString()),
      token: localStorage.getItem('token')
    }
    
    let res = await this.retailService.getOrders(data);    
    if (res.mensaje_return.ERROR==true) {      
    }else{
      console.log('res => ',res);
      res.return_result[0][1].forEach(o=>{                
        let disp = o.name_status_package=='ENTREGADO'?true:false;
        this.data.push({
          order: o.order_number, 
          email: o.email, 
          employeId: o.delivery_company_employee_id,
          delivery_employee_name: o.delivery_employee_name,
          tracking: o.tracking_number,
          doors: o.door_number,
          compartment: o.compartment_name,
          status: o.name_status_package,
          inLocker: o.package_delivery_date,
          expired: o.expiration_date,
          pickedUp: disp,
          signature: disp,
          signImg: (disp) ? o.IMAGE.url_view_imagen_signature : "null",
          pickImg: (disp) ? o.IMAGE.url_view_image_pickup : "null"
        })
      })      
      this.dataTableAux = JSON.stringify(this.data);      
    }
  }

  async getMetrics(){    
    let date: Date = new Date()
    this.dataMonth = []
    let data = {
      lenguage: this.lang,
      id_locker: localStorage.getItem('id_locker'),
      id_company: localStorage.getItem('id_company'),
      package_delivered_month: true,
      package_returned_month: true,
      package_pickup_month: true,
      year: date.getFullYear(),
      package_carrier: false,
      package_status: false,
      size_package: true,
      date_start : Date.parse(this.msdate.toString()),
      date_end : Date.parse(this.mfdate.toString()),
      user_recurrent: true,
      package_avg: true,
      retail: true,
      orders_delivered_today: true,
      compartment_percentage: true,
      collection_success_rate: true,
      total_locker_usage: true,
      package_total_delivery: true,
      package_total_pickup: true,
      token: localStorage.getItem('token')
    }
    let month = []    
    this.cantReturn = [];
    this.metrics = await this.retailService.getMetrics(data);
    this.metrics[2][1].forEach((e:any)=>{      
      this.dataMonth.push(e.cant);
      if((this.lang == 'EN')){
        month.push(this.monthsArrayEN[(e.IdMes-1)]);
      }else{
          month.push(this.monthsArrayES[(e.IdMes-1)]);
      }
    })
    this.metrics[4][1].forEach((e:any)=>{
      this.cantReturn.push(e.cant)
    })
    this.compSizes = this.metrics[5][1]    
    // this.cantReturn.forEach(e => {
    //   this.datar = this.datar + e
    // });
    this.datar = JSON.stringify(this.cantReturn)
    this.compSizes = JSON.stringify(this.compSizes)
    this.months = month.join(',')    
    this.dataMonth.forEach(e=>{
      this.usage = this.usage + e;
    })
    this.dataChart = JSON.stringify(this.dataMonth)
    // this.months = JSON.stringify(month)
    

    //var d = new Date(this.metrics[0][1][0].avg_time);
     //console.log(d.getMinutes() + ":" + d.getSeconds());

    this.metrics[0][1][0].avg_time==null?
    this.metrics[0][1][0].avg_time='--:--':null;

    let [hours, minutes, seconds] = this.metrics[0][1][0].avg_time.split(':');
    this.avg_time = hours+":"+minutes;

    this.collection_success_rate = parseFloat(this.metrics[0][1][0].collection_success_rate).toFixed(0);

  }
  ngOnDestroy(): void {
    localStorage.removeItem('locker_name')
  }
  onSeeCameras(id_locker){
    this._router.navigateByUrl("l-ad/locker/"+id_locker+"/cameras");
  }
  onResetLocker(id_locker){
    let data = {
      "language" :localStorage.getItem('lenguage'),
      "id_locker":this.id_locker,
      "ip_address": "192.168.1.92",
      "locker_hash": this.hashLocker,
      "id_user":"2"//this.userID

    };
    this.ServerUserService.post_reboot_unit(data).subscribe( res => {      
    });
  }
  toggleCamera(c){
    this.camera = !this.camera
    this.url = c.url_view
    this.cameraName = c.monitor_name
    this.singleCam = c
  }
  async getLockerGrid(){
    let data = {
      language: localStorage.getItem('lenguage').toLowerCase(),
      id_locker: this.locker,
      token: localStorage.getItem('token')
    }
    this.dataGrid = await this.retailService.getLockersGrid(data);    
    this.dataGrid.quantity_compartment.compartment.forEach((e, i)=>{
      e.compartment_name=="XXXL"?this.xxxl = e.quantity:
      e.compartment_name=="XXL"?this.xxl = e.quantity:
      e.compartment_name=="XL"?this.xl = e.quantity:
      e.compartment_name=="L"?this.l = e.quantity:
      e.compartment_name=="M"?this.m = e.quantity:null
    })
    // this.xxxl = this.dataGrid.quantity_compartment.compartment[0].quantity;
    // this.l = this.dataGrid.quantity_compartment.compartment[1].quantity;
    // this.xxl = this.dataGrid.quantity_compartment.compartment[2].quantity;
    // this.m = this.dataGrid.quantity_compartment.compartment[3].quantity;
    // this.xl = this.dataGrid.quantity_compartment.compartment[4].quantity;
    this.modulo = JSON.stringify(this.dataGrid.modulo_status);        
    this.cStatus = JSON.stringify(this.dataGrid.quantity_compartment.compartment_status)
    
    this.dataGrid.modulo_status.forEach((m:any) => {
      m.DOOR.forEach((d:any) => {        
        if((d.compartment_name =="XXXL" && d.name_status == "OCUPADO") || (d.compartment_name =="XXXL" && d.name_status == "VECIDO"))
          this.xxxl = (this.xxxl-1);

        if((d.compartment_name =="XXL" && d.name_status == "OCUPADO") || ( d.compartment_name =="XXL" && d.name_status == "VECIDO"))
          this.xxl = (this.xxl-1);

        if((d.compartment_name =="XL" && d.name_status == "OCUPADO") || (d.compartment_name =="XL" && d.name_status == "VECIDO"))
          this.xl = (this.xl-1);

        if((d.compartment_name =="L" && d.name_status == "OCUPADO") || (d.compartment_name =="L" && d.name_status == "VECIDO"))
          this.l = (this.l-1);

        if((d.compartment_name =="M" && d.name_status == "OCUPADO") || (d.compartment_name =="M" && d.name_status == "VECIDO"))
          this.m = (this.m-1);
      })
    })
  }

  async getCams(){
    let params = {
      language: localStorage.getItem('lenguage').toLowerCase(),
      id_locker: localStorage.getItem('id_locker'),
      token: localStorage.getItem('token')
    }
    let cams:any = await this.retailService.camList(params);
    this.cameras = cams.result_monitor
  }

  getMap(){
    this.longitud=Number(localStorage.getItem('lng'))
    this.latitud=Number(localStorage.getItem('lat'))
    if (this.latitud && this.longitud) {
      this.arrayMarker = [
        {
          draggable: false, 
          id_locker: 2, 
          label: 'I', 
          lat: 0, 
          lng: 0, 
          locker_name: 'VIVITEST'
        }
      ];
      this.arrayMarker = JSON.stringify(this.arrayMarker);
    }
  }

  async record(){
    if (!this.safari && !this.device) {
      let temp1 = this.date_stamp.toString().replace('00:00:00', `${this.time_start.getHours()}:${this.time_start.getMinutes()}:${this.time_start.getSeconds()}`)
      let temp2 = this.date_stamp.toString().replace('00:00:00', `${this.time_end.getHours()}:${this.time_end.getMinutes()}:${this.time_end.getSeconds()}`)
      let date1 = new Date(temp1).getTime()
      let date2 = new Date(temp2).getTime()
      let params = {
        language: localStorage.getItem('lenguage').toLowerCase(),
        ip_address: this.singleCam.ip_address,
        date_start: date1,
        date_end: date2,
        cam: this.singleCam.id,
        token: localStorage.getItem('token')
      }
      let data = await this.retailService.camEvent(params);
    }
    else if (!this.safari && this.device) {
      let temp1 = this.ddate_stamp.toString().replace('00:00:00', `${this.dtime_start.getHours()}:${this.time_start.getMinutes()}:${this.time_start.getSeconds()}`)
      let temp2 = this.ddate_stamp.toString().replace('00:00:00', `${this.dtime_end.getHours()}:${this.time_end.getMinutes()}:${this.time_end.getSeconds()}`)
      let date1 = new Date(temp1).getTime()
      let date2 = new Date(temp2).getTime()
      let params = {
        language: localStorage.getItem('lenguage').toLowerCase(),
        ip_address: this.singleCam.ip_address,
        date_start: date1,
        date_end: date2,
        cam: this.singleCam.id,
        token: localStorage.getItem('token')
      }
      let data = await this.retailService.camEvent(params);
    }
    else if(this.safari){
      let temp1 = this.sdate_stamp.toString().replace('00:00:00', `${this.stime_start.getHours()}:${this.time_start.getMinutes()}:${this.time_start.getSeconds()}`)
      let temp2 = this.sdate_stamp.toString().replace('00:00:00', `${this.stime_end.getHours()}:${this.time_end.getMinutes()}:${this.time_end.getSeconds()}`)
      let date1 = new Date(temp1).getTime()
      let date2 = new Date(temp2).getTime()
      let params = {
        language: localStorage.getItem('lenguage').toLowerCase(),
        ip_address: this.singleCam.ip_address,
        date_start: date1,
        date_end: date2,
        cam: this.singleCam.id,
        token: localStorage.getItem('token')
      }
      let data = await this.retailService.camEvent(params);                 
    }
  }
}
