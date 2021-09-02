import { Component, Input, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Locker, Module, Status } from 'src/app/models/locker_model';
import { ServerUserService } from 'src/app/services/server-user.service';
import { BrowserAnimationsModule }
from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { RetailService } from 'src/app/services/retail.service';
@Component({
  selector: 'app-lockers-client-grid',
  templateUrl: './lockers-client-grid.component.html',
  styleUrls: ['./lockers-client-grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LockersClientGridComponent implements OnInit {
  @Input() modulo;
  @Input() cStatus;
  arrayNodeLocker:any = [];
  data;
  res;
  tt_open = 0;
  tt_occupied = 0;
  tt_available = 0;
  tt_damaged = 0;
  count_door=1;
  locker_info: Locker[] = [];
  id_locker:number
  cols: number[];
  rows: number[];
  lockers: Locker[];
  module: Module[] = [];
  module2: Module[];
  col: number = 0;
  height: number = 0;
  modulos = 0;
  device = false;
  safari: boolean = false;
  grid
  temp = []
  tt_expired:number=0;
  constructor(
    private ServerUserService: ServerUserService,
    private datepipe: DatePipe,
    private platform: Platform,
    private retailService: RetailService
    ) { }
  ngOnInit() {
    this.safari = this.platform.SAFARI
    if (this.platform.ANDROID || this.platform.IOS) {
      this.device = true;
    } else this.device = false
    this.grid = JSON.parse(localStorage.getItem('grid'));    
    this.grid.forEach((e,i) => {
      e.forEach((l) => {
        if(l.class === "NULL"){
          l.text = "null";
        }else if( l.class === "SCREEN" ){
          l.text = "SCREEN";
        }else{
           l.text = this.count_door++;
        }
      })
      this.module.push(
        {id: i+1, locker: e}
      )
    });
    this.getGrid()
    // this.module = [
    //   {id: 1, locker: [{text: 1, rows: 12, cols: 6, class: Status.CERRADO}]},
    //   {id: 2, locker: [{text: 2, rows: 5, cols: 3, class: Status.CERRADO},
    //                    {text: 3, rows: 5, cols: 3, class: Status.CERRADO}, 
    //                    {text: 4, rows: 7, cols: 6, class: Status.CERRADO}]},
    //   {id: 3, locker: [{text: 5, rows: 5, cols: 3, class: Status.CERRADO}, 
    //                    {text: 6, rows: 5, cols: 3, class: Status.OCUPADO}, 
    //                    {text: 7, rows: 7, cols: 6, class: Status.CERRADO}]},
    //   {id: 4, locker: [{text: 8, rows: 5, cols: 3, class: Status.CERRADO}, 
    //                    {text: 9, rows: 5, cols: 3, class: Status.OCUPADO}, 
    //                    {text: 10, rows: 7, cols: 6, class: Status.CERRADO}]},
    //   {id: 5, locker: [{text: 11, rows: 5, cols: 3, class: Status.SCREEN}, 
    //                    {text: 12, rows: 5, cols: 3, class: Status.ABIERTO},
    //                    {text: 0, rows: 2, cols: 6, class: ''} ,
    //                    {text: 13, rows: 5, cols: 6, class: Status.FALLO}]},
    //   {id: 6, locker: [{text: 14, rows: 5, cols: 2, class: Status.CERRADO}, 
    //                    {text: 15, rows: 5, cols: 2, class: Status.CERRADO}, 
    //                    {text: 16, rows: 5, cols: 2, class: Status.OCUPADO},
    //                    {text: 0, rows: 2, cols: 6, class: ''} ,
    //                    {text: 17, cols: 6, rows: 5, class: Status.CERRADO}]},
    //   {id: 7, locker: [{text: 18, rows: 5, cols: 2, class: Status.CERRADO},
    //                    {text: 19, rows: 5, cols: 2, class: Status.FALLO}, 
    //                    {text: 20, rows: 5, cols: 2, class: Status.CERRADO}, 
    //                    {text: 0, rows: 2, cols: 6, class: ''} ,
    //                    {text: 21, cols: 6, rows: 5, class: Status.CERRADO}]}
    // ];
  }
  ngOnChanges() {
    if (this.cStatus && this.modulo) {
      this.cStatus=JSON.parse(this.cStatus)
      this.modulo=JSON.parse(this.modulo)      
      this.cStatus.forEach(e => {
        e.name_status=='CERRADO'?this.tt_available=e.quantity:
        e.name_status=='ABIERTO'?this.tt_open=e.quantity:
        e.name_status=='FALLO'?this.tt_damaged=e.quantity:
        e.name_status=='OCUPADO'?this.tt_occupied=e.quantity:
        null
      });
    }
  }
  itemToolInfo(m: Module, l: Locker){
    let date = new Date();
    let d = this.datepipe.transform(date, 'dd/MM/y')
    let info = `Order Number: ${l.order_number} \n Order Ikea: ${ l.tracking_number } \n Status Comparment: ${l.class}`;
    return info;
  }
  async getGrid(){
    let params = {
      language: localStorage.getItem('lenguage').toLowerCase(),
      id_locker: localStorage.getItem('id_locker'),
      token: localStorage.getItem('token')
    }
    let lockerGrid:any = await this.retailService.getLockersGrid(params);    
    lockerGrid.modulo_status.forEach((e, i) => {
      e.DOOR.forEach(d=>{
        this.module.forEach((e, i) =>{
          e.locker.forEach((l) => {
            if(l.text == d.door_number){
              l.class = d.GRID.class;
              if(d.PACKAGE[0] != undefined){
                l.order_number     = Number(d.PACKAGE[0].order_number)
                l.tracking_number  = d.PACKAGE[0].tracking_number
                l.status_name      = d.PACKAGE[0].status_name
                if(d.PACKAGE[0].status_name == "VENCIDO")
                  this.tt_expired++;
              }else{
                l.order_number    = 0
                l.tracking_number  = "N/A"
              }         
            }
          })
        })                
      })      
    });
  }
}