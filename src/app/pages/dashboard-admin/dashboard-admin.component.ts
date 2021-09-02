import { Component, OnInit } from '@angular/core';
import { ServerUserService } from '../../services/server-user.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
  dataChart = [];
  dataChart2 = [];

  responseQuantityMonthAxisX=[];
  responseQuantityMonthAxisY=[];
  nameY;
  responseQuantityCarrierName=[];
  responseQuantityCarrierY=[];
  
  responseQuantityLockerName=[];
  responseQuantityLockerY=[]; 

  arrayMarker:any=[];
  arrayLockers;
  auxLockers =[];
  constructor(
    private ServerUserService: ServerUserService,) { }

  ngOnInit() {
    this.get_lockersMap();

    //graphics
    this.quantity_locker();
    this.quantity_carrier();
  }

  quantity_locker(){
    let data = {
      "language" :localStorage.getItem('lenguage'),
      "top": 5
    };
    this.ServerUserService.get_quantity_locker( data ).subscribe( res => {
        if( res.mensaje_return.ERROR == false ){        
          res.quantity_package_locker.forEach(element => {
            this.responseQuantityLockerName.push(element.locker_name);
            this.responseQuantityLockerY.push(element.cant);
          });
        }else{
          this.responseQuantityLockerName=[];
          this.responseQuantityLockerY=[];
        }
    });
  }

  quantity_carrier(){
    let data = {
      "language" :localStorage.getItem('lenguage'),
      "top": 5
    };
    this.ServerUserService.get_quantity_carrier( data ).subscribe( res => {
        if( res.mensaje_return.ERROR == false ){        
          
          res.quantity_carrier.forEach(element => {
            this.responseQuantityCarrierName.push(element.courier_name);
            this.responseQuantityCarrierY.push(element.cant);
          });
        }else{
          this.responseQuantityCarrierName=[];
          this.responseQuantityCarrierY=[];
        }

    });
  }

  get_lockersMap(){
    let count= 0; 
    let data = {
      "language" :localStorage.getItem('lenguage')
    };

    this.ServerUserService.get_query_locker_company(data).subscribe( res => {
      if( res.mensaje_return.ERROR == false ){     

        res.locker_company[0][1].forEach(element => {
          this.auxLockers.push(res.locker_company[0][1][count++]);
          this.arrayLockers = JSON.stringify(this.auxLockers);

          this.arrayMarker.push({
            lat:             element.latitud,
            lng:             element.longitud,
            label:           'V',
            draggable:       false,
            id_locker:       element.id_locker,
            locker_name:     element.locker_name,
            locker_address:  element.locker_address
          });
        });
        this.arrayMarker = JSON.stringify(this.arrayMarker);
      }else{
        this.arrayLockers=[];
        this.arrayMarker = JSON.stringify([{}]);
      }      
    });
  }
}