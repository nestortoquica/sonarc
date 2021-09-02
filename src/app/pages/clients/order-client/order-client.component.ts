import { Component, OnInit } from '@angular/core';
import { RetailService } from 'src/app/services/retail.service';
import { ServerUserService } from '../../../services/server-user.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import jsPDF from 'jspdf';
import { TranslateService } from '@ngx-translate/core';
import { LOGO } from 'src/assets/const';

@Component({
  selector: 'app-order',
  templateUrl: './order-client.component.html',
  styleUrls: ['./order-client.component.scss']
})
export class OrderClientComponent implements OnInit {

  months: any = []
  dataChart: any;
  dataSeries='';
  responseQuantityCarrierName=[];
  responseQuantityCarrierY=[];
  lang;
  responseQuantityLockerName=[];
  responseQuantityLockerY=[]

  idUserCompany;
  data;
  pendingData;
  generalData;
  refundData;
  expiredData;
  refundDataTable=[];
  generalDataTable=[];
  dataTable = [];
  pendingTable=[]
  expiredTable = [];
  columns;
  columns1
  columns2
  res;
  total;
  today = 0;
  totalYesterday = 0;
  rate:any = 0;
  pending = 0;
  pendingYesterday = 0;
  pendingRate: number|string = 0;
  mostUsed: any[] = [];
  day: Date
  local
  consumerCount
  mostActiveLockers
  orderMonths = []
  chart
  month
  list =[]
  pend = 0;
  refund = 0;
  all = 0;
  exp = 0;
  deliveries: any = {};
  general: any = {};
  adate = new Date(); // Fecha Actual
  sdate = new Date(this.adate.setMonth(this.adate.getMonth() - 1)); // Fecha actual menos un mes
  fdate = new Date();
  maxDate = new Date();
  sizes = ''
  constructor(
    private retailService: RetailService,
    private translate: TranslateService
  ) {}

  ngOnInit() {

    this.getText()
    localStorage.getItem('lenguage')=='EN'?
    this.list = [
      {
        id: 1,
        month: 'January',
      },
      {
        id: 2,
        month: 'February',
      },
      {
        id: 3,
        month: 'March',
      },
      {
        id: 4,
        month: 'April',
      },
      {
        id: 5,
        month: 'May',
      },
      {
        id: 6,
        month: 'June',
      },
      {
        id: 7,
        month: 'July',
      },
      {
        id: 8,
        month: 'August',
      },
      {
        id: 9,
        month: 'September',
      },
      {
        id: 10,
        month: 'October',
      },
      {
        id: 11,
        month: 'November',
      },
      {
        id: 12,
        month: 'December',
      },
    ]:
    this.list = [
      {
        id: 1,
        month: 'Enero',
      },
      {
        id: 2,
        month: 'Febrero',
      },
      {
        id: 3,
        month: 'Marzo',
      },
      {
        id: 4,
        month: 'Abril',
      },
      {
        id: 5,
        month: 'Mayo',
      },
      {
        id: 6,
        month: 'Junio',
      },
      {
        id: 7,
        month: 'Julio',
      },
      {
        id: 8,
        month: 'Agosto',
      },
      {
        id: 9,
        month: 'Septiembre',
      },
      {
        id: 10,
        month: 'Octubre',
      },
      {
        id: 11,
        month: 'Noviembre',
      },
      {
        id: 12,
        month: 'Diciembre',
      },
    ]
    this.local = JSON.parse(localStorage.getItem("data"));
    this.getConsumerCount();
    //this.generalChart();
    this.getData();
    this.day = new Date();
    this.day.setMonth(this.day.getMonth()-12);
    this.columns = ['order', 'tracking', 'lockerID', 'email', 'employeId', 'doors', 'compartment', 'status', 'inLocker', 'pickedUp', 'signature']
    this.columns1 = ['order', 'tracking', 'lockerID', 'email', 'employeId', 'doors', 'compartment', 'status', 'inLocker', 'pickedUp', 'signature', 'actions']
    this.columns2 = ['order', 'tracking', 'lockerID', 'email', 'employeId', 'doors', 'compartment', 'status', 'inLocker', 'actions']
    
  }
 
  async getText(){
    this.deliveries = await this.translate.get('deliveries').toPromise()
    this.general = await this.translate.get('general').toPromise()
  }
  
  async getData(){ 
    this.months = [];
    this.lang = localStorage.getItem('lenguage');
    this.lang=='EN'?
    this.dataChart = [
      {id_mes: 1, mes_package: 'January', orders: 0},
      {id_mes: 2, mes_package: 'February', orders: 0},
      {id_mes: 3, mes_package: 'Marzo', orders: 0},
      {id_mes: 4, mes_package: 'April', orders: 0},
      {id_mes: 5, mes_package: 'May', orders: 0},
      {id_mes: 6, mes_package: 'June', orders: 0},
      {id_mes: 7, mes_package: 'July', orders: 0},
      {id_mes: 8, mes_package: 'August', orders: 0},
      {id_mes: 9, mes_package: 'September', orders: 0},
      {id_mes: 10, mes_package: 'October', orders: 0},
      {id_mes: 11, mes_package: 'November', orders: 0},
      {id_mes: 12, mes_package: 'Diciembre', orders: 0},
    ]:
    this.dataChart = [
      {id_mes: 1, mes_package: 'Enero', orders: 0},
      {id_mes: 2, mes_package: 'Febrero', orders: 0},
      {id_mes: 3, mes_package: 'Marzo', orders: 0},
      {id_mes: 4, mes_package: 'Abril', orders: 0},
      {id_mes: 5, mes_package: 'Mayo', orders: 0},
      {id_mes: 6, mes_package: 'Junio', orders: 0},
      {id_mes: 7, mes_package: 'Julio', orders: 0},
      {id_mes: 8, mes_package: 'Agosto', orders: 0},
      {id_mes: 9, mes_package: 'Septiembre', orders: 0},
      {id_mes: 10, mes_package: 'Octubre', orders: 0},
      {id_mes: 11, mes_package: 'Noviembre', orders: 0},
      {id_mes: 12, mes_package: 'Diciembre', orders: 0},
    ]
    
    this.dataChart.forEach(element => {
      this.months.push(element.mes_package)
    });

    this.months = this.months.join(',')
    let temp: any[] = []

    let data = {
      language: localStorage.getItem('lenguage').toLowerCase(),
      id_company: localStorage.getItem('id_company'),
      token: localStorage.getItem('token'),
      date_start : Date.parse(this.sdate.toString()),
      date_end : Date.parse(this.fdate.toString())
    }    

    
    this.res = await this.retailService.getAllOrders(data);
    this.orderMonths = [];    
    let d: Date
    this.orderMonths = [];
    let l = 0
    let m = 0
    let xl = 0
    let xxl = 0
    let xxxl = 0
    this.refundDataTable=[];
    this.generalDataTable=[];
    this.dataTable = [];
    this.pendingTable=[]
    this.expiredTable = [];
    this.res.forEach(o=>{            
      if (o.compartment_name=='M')
        m++
      else if (o.compartment_name=='L')
        l++
      else if (o.compartment_name=='XL')
        xl++
      else if (o.compartment_name=='XXL')
        xxl++
      else if (o.compartment_name=='XXXL')
        xxxl++
      d = new Date(o.send_date)
      this.dataChart.forEach(e=>{
        if (e.id_mes == d.getMonth()+1) {
          e.orders++
        }
      })
      let disp = o.name_status_package=='ENTREGADO'?true:false;
      this.generalDataTable.push({ // Todos los paquetes
        order: o.order_number,
        lockerID: o.locker_name,
        email: o.email, 
        tracking: o.tracking_number,
        doors: o.door_number,
        compartment: o.compartment_name,
        status: o.name_status_package,
        inLocker: o.package_delivery_date,
        pickedUp: disp,
        signature: disp,
        signImg: o.IMAGE.url_view_imagen_signature,
        pickImg: o.IMAGE.url_view_image_pickup,
        employeId: o.company_employee_id,
        id_package_code: o.id_package_code,
        id_status_code_package: o.id_status_code_package,
        status_package: o.status_package,
        delivery_employee_name: o.delivery_employee_name
      })

      o.id_status_code_package == 18 && o.status_package == 16?
      this.dataTable.push({
        order: o.order_number,
        lockerID: o.locker_name,
        email: o.email, 
        tracking: o.tracking_number,
        doors: o.door_number,
        compartment: o.compartment_name,
        status: o.name_status_package,
        inLocker: o.package_delivery_date,
        pickedUp: disp,
        signature: disp,
        signImg: o.IMAGE.url_view_imagen_signature,
        pickImg: o.IMAGE.url_view_image_pickup,
        employeId: o.company_employee_id,
        id_package_code: o.id_package_code,
        id_status_code_package: o.id_status_code_package,
        status_package: o.status_package  ,
        delivery_employee_name: o.delivery_employee_name
             
      }):o.id_status_code_package == 17 && o.status_package == 14? 
      this.pendingTable.push({
        order: o.order_number,
        lockerID: o.locker_name,
        email: o.email, 
        tracking: o.tracking_number,
        doors: o.door_number,
        compartment: o.compartment_name,
        status: o.name_status_package,
        inLocker: o.package_delivery_date,
        pickedUp: disp,
        signature: disp,
        signImg: o.IMAGE.url_view_imagen_signature,
        pickImg: o.IMAGE.url_view_image_pickup,
        employeId: o.company_employee_id,
        id_package_code: o.id_package_code,
        id_status_code_package: o.id_status_code_package,
        status_package: o.status_package,
        actions: ['far fa-edit'],
        delivery_employee_name: o.delivery_employee_name
      }):o.id_status_code_package == 32 && o.status_package == 33?
      this.refundDataTable.push({
        order: o.order_number,
        lockerID: o.locker_name,
        email: o.email, 
        tracking: o.tracking_number,
        doors: o.door_number,
        compartment: o.compartment_name,
        status: o.name_status_package,
        inLocker: o.package_delivery_date,
        pickedUp: disp,
        signature: disp,
        //signImg: o.IMAGE.url_view_imagen_signature,
        //pickImg: o.IMAGE.url_view_image_pickup,
        employeId: o.company_employee_id,
        id_package_code: o.id_package_code,
        id_status_code_package: o.id_status_code_package,
        status_package: o.status_package,
        //pickupCode: Math.random()*100,
        actions: ['far fa-edit'],
        delivery_employee_name: o.delivery_employee_name
      }):o.id_status_code_package == 32 && o.status_package == 14? 
      this.expiredTable.push({
        order: o.order_number,
        lockerID: o.locker_name,
        email: o.email, 
        tracking: o.tracking_number,
        doors: o.door_number,
        compartment: o.compartment_name,
        status: o.name_status_package,
        inLocker: o.package_delivery_date,
        pickedUp: disp,
        signature: disp,
        //signImg: o.IMAGE.url_view_imagen_signature,
        //pickImg: o.IMAGE.url_view_image_pickup,
        employeId: o.company_employee_id,
        id_package_code: o.id_package_code,
        id_status_code_package: o.id_status_code_package,
        status_package: o.status_package,
        //pickupCode: Math.random()*100,
        actions: ['far fa-edit'],
        delivery_employee_name: o.delivery_employee_name
      }):'';

      temp.push(o);
      });
      this.all = this.generalDataTable.length
      this.refund = this.refundDataTable.length
      this.pend = this.pendingTable.length
      this.exp = this.expiredTable.length
      this.chart = JSON.stringify(this.dataChart)
      this.getDeliveredAndPending(temp)
      this.getMostUsedSize(temp);
      let sizing = [
        {name: 'M', y: m},
        {name: 'L', y: l},
        {name: 'XL', y: xl},
        {name: 'XXL', y: xxl},
        {name: 'XXXL', y: xxxl},
      ]

      this.generalData = JSON.stringify(this.generalDataTable)      
      this.refundData = JSON.stringify(this.refundDataTable)      
      this.sizes = JSON.stringify(sizing)
  }

  async getConsumerCount(){
    let data = {
      language: localStorage.getItem('lenguage'),
      id_company: this.local.data_company.id_company,
      token: localStorage.getItem('token')
    }
    this.consumerCount = await this.retailService.getConsumerCompanyCount(data);
  }

  getDeliveredAndPending(order){
    order.forEach(o=>{
      let day = new Date(o.package_delivery_date)
      let dMonth = day.getMonth().toString().split('').length==1?'0'+(day.getMonth()+1).toString():(day.getMonth()+1).toString()
      let d = `${day.getFullYear()}-${dMonth}-${('0'+day.getDate()).slice(-2)}` //* Día de orden parseado
      let date = new Date(); //*HOY
      let todayMonth = date.getMonth().toString().split('').length==1?'0'+(date.getMonth()+1).toString():(date.getMonth()+1).toString()
      
      let t = `${date.getFullYear()}-${todayMonth}-${('0'+date.getDate()).slice(-2)}` //* HOY Parseado
      let y = `${date.getFullYear()}-${todayMonth}-${('0'+(date.getDate()-1)).slice(-2)}` //* AYER Parseado
      
      if (d==y) {
        this.totalYesterday++
        if (o.status_package!=14) {
          this.pending++
        }
      }
      if (d == t) {
        this.today++;
        if (o.status_package!=14) {
          this.pendingYesterday++
        }
      }
    });
    if (this.pendingYesterday!=0) {
      this.pendingRate = ((this.pending-this.pendingYesterday)/this.pendingYesterday)*100
    } else if (this.pendingYesterday==0 && this.pending>0) {
      this.pendingRate=100;
    }
    this.total = this.res.length
    this.data = JSON.stringify(this.dataTable)
    this.pendingData = JSON.stringify(this.pendingTable)    
    this.expiredData = JSON.stringify(this.expiredTable)
    if (this.totalYesterday!=0) {
      this.rate = ((this.today-this.totalYesterday)/this.totalYesterday)*100;
      this.rate = parseFloat(this.rate).toFixed(2);
    } else if (this.totalYesterday==0 && this.pending>0){
      this.rate = 100;
    }
    this.pendingRate = this.pendingRate>=0?'+'+this.pendingRate.toString():this.pendingRate;
    this.rate = this.rate>=0?'+'+this.rate.toString():this.rate;
  }

  navigate(){

  }
  
  getMostUsedSize(order){
    let sizes: any[] = [];
    let s = 0
    let m = 0
    let l = 0
    let xl = 0
    let xxl = 0
    let xxxl = 0    
    order.forEach(o => {      
      switch (o.compartment_name) {
        case 'Chico' || 'S':
          s++
          sizes[0] = {size: 'S', total: s}
          break;
        case 'M':
          m++
          sizes[1] = {size: o.compartment_name, total: m}
          break;
        case 'L':
          l++
          sizes[2] = {size: o.compartment_name, total: l}
          break;
        case 'XL':
          xl++
          sizes[3] = {size: o.compartment_name, total: xl}
          break;
        case 'XXL':
          xxl++
          sizes[4] = {size: o.compartment_name, total: xxl}
          break;
        case 'XXXL':
          xxxl++
          sizes[5] = {size: o.compartment_name, total: xxxl}
          break;
        default:
          break;
        }
    });
    sizes.sort((a,b)=>{
      return b.total - a.total;
    });
    this.mostUsed = sizes;
  }

  async generalChart(){
    let data = {
      language: localStorage.getItem('lenguage'),
      year: new Date().getFullYear(),
      id_company: this.local.data_company.id_company,
      token: localStorage.getItem('token')
    }
    this.mostActiveLockers = await this.retailService.getMostActiveLocker(data);
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    let length = 0
    this.mostActiveLockers.forEach((e, l)=>{
      length = l+1
      let cantidad = 0
      e.MONTH.forEach((j, i)=>{
        Object.defineProperty(this.list[i], 'name'+(l+1), {value: e.locker_name, writable: true, configurable: true, enumerable: true})
        cantidad = e.cant
        if (this.list[i].id == j.IdMes) {
          Object.defineProperty(this.list[i], `cant${l+1}`, {value: j.cant, writable: true, configurable: true, enumerable: true})
          Object.defineProperty(this.list[i], `total${l+1}`, {value: cantidad-j.cant, writable: true, configurable: true, enumerable: true})
        }
      })
    })
    chart.data = this.list
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "month";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.labels.template.rotation = 10
    categoryAxis.renderer.minGridDistance = 8;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;
    
    let  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    for (let i = 1; i < length+1; i++) {
      this.createSeries(`cant${i}`, this.list[i]['name'+i], false, chart, length);
      this.createSeries(`total${i}`, "Total", true, chart, length);
      
    }
    this.list.forEach((e, i)=>{
    })
    chart.legend = new am4charts.Legend();
    chart.responsive.rules.push({
      relevant: function(target) {
        if (target.pixelWidth <= 1000) {
          categoryAxis.renderer.labels.template.rotation = 77
          categoryAxis.renderer.labels.template.dx = 20
          categoryAxis.renderer.labels.template.dy = -5
          return true;
        }
        else{
          categoryAxis.renderer.labels.template.rotation = 10
          return false;
        }
      },
      state: function(target, stateId) {
        if (target instanceof am4charts.Chart) {
          let state = target.states.create(stateId);
          state.properties.paddingTop = 0;
          state.properties.paddingRight = 15;
          state.properties.paddingBottom = 5;
          state.properties.paddingLeft = 15;
          return state;
        }
        return null;
      }
    });
  }

  createSeries(field, name, stacked, chart: am4charts.XYChart, length) {
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = field;
    series.dataFields.categoryX = "month";
    series.name = name;
    series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
    series.stacked = stacked;
    series.columns.template.width = am4core.percent((100/length)-5);
    series.columns.template.height = 10000
    series.legendSettings.createMarker = true
    if (stacked==true) {
      series.hiddenInLegend = true
      series.fill = am4core.color('#dddddd')
    }
  }

  downloadPDF(){
    let sizes = [
      {size: 'L', cant: 3},
      {size: 'XL', cant: 0},
      {size: 'XXL', cant: 1},
      {size: 'XXXL', cant: 1},
    ]
    const doc = new jsPDF();
    doc.addImage(LOGO, 'png', 150, 10, 30, 15)
    doc.fromHTML('<h1>Orders</h1>', 10, 10)
    
    let sdate = this.sdate.getDate() +'/'+ (this.sdate.getMonth()+1) + '/' + this.sdate.getFullYear()
    let fdate = this.fdate.getDate() +'/'+ (this.fdate.getMonth()+1) + '/' + this.fdate.getFullYear()
    doc.fromHTML(sdate.toString(), 50, 18)
    doc.fromHTML('-', 70, 18)
    doc.fromHTML(fdate.toString(), 75, 18)
    let y = 45
    doc.line(5, 34, 55, 34)
    doc.line(5, 44, 55, 44)
    doc.fromHTML('<h3>'+this.deliveries.summary+'</h3>', 10, 30);
    this.mostActiveLockers.forEach(e => {
      doc.fromHTML(e.locker_name, 10, y)
      doc.fromHTML(e.cant.toString(), 45, y)
      y=y+10;
    });
    doc.line(5, 34, 5, y)
    doc.line(55, 34, 55, y)
    doc.line(43, 44, 43, y)
    doc.line(5, y, 55, y)

    y = 45
    doc.fromHTML('<h3>'+this.deliveries.total_deliveries+'</h3>', 65, 30)
    doc.line(60, 35, 120, 35)
    doc.line(60, 45, 120, 45)
    this.dataChart.forEach(e=>{
      doc.fromHTML(e.mes_package, 65, y)
      doc.fromHTML(e.orders.toString(), 100, y)
      y=y+10
    })
    doc.line(60, 35, 60, y)
    doc.line(120, 35, 120, y)
    doc.line(60, y, 120, y)
    doc.line(90, 45, 90, y)
    
    y = 45
    doc.line(125, 35, 190, 35)
    doc.line(125, 45, 190, 45)
    doc.fromHTML('<h3>'+this.deliveries.deliver_size+'</h3>', 130, 30)
    sizes.forEach(e=>{
      doc.fromHTML(e.size, 130, y)
      doc.fromHTML(e.cant.toString(), 160, y)
      y = y+10
    })
    doc.line(125, 35, 125, y)
    doc.line(190, 35, 190, y)
    doc.line(125, y, 190, y)
    doc.line(155, 45, 155, y)

    doc.rect(5, 175, 45, 20)
    doc.line(5, 185, 50, 185)
    doc.fromHTML('<h3>'+this.general.totalCustomers+'</h3>', 10, 170)
    doc.fromHTML(this.consumerCount.toString(), 25, 185)

    doc.rect(60, 175, 60, 20)
    doc.line(60, 185, 120, 185)
    doc.fromHTML('<h3>'+this.deliveries.total_deliveries+'</h3>', 65, 170)
    doc.fromHTML(this.total.toString(), 85, 185)

    doc.rect(125, 175, 60, 20)
    doc.line(125, 185, 185, 185)
    doc.fromHTML('<h3>'+this.deliveries.deliver_today+'</h3>', 130, 170)
    doc.fromHTML(this.today.toString(), 150, 185)

    doc.rect(5, 205, 45, 20)
    doc.line(5, 215, 50, 215)
    doc.fromHTML('<h3>'+this.deliveries.expired+'</h3>', 10, 200)
    doc.fromHTML(this.pending.toString(), 25, 215)

    doc.rect(55, 205, 70, 20)
    doc.line(55, 215, 125, 215)
    doc.fromHTML('<h3>'+this.deliveries.most_used_compartment+'</h3>', 57, 200)
    doc.fromHTML(this.mostUsed[0].size.toString(), 82, 215)

    doc.rect(130, 205, 60, 20)
    doc.line(130, 215, 190, 215)
    doc.fromHTML('<h3>'+this.deliveries.mostActiveLocation+'</h3>', 135, 200)
    doc.fromHTML(this.mostActiveLockers[0].locker_name.toString(), 145, 215)
    doc.save('orders.pdf');
  }

  downloadExcel(){
    
  }
  
}
