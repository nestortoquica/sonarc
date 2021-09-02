import { Component, OnInit, ɵConsole, SimpleChanges} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServerUserService } from '../../services/server-user.service';
import {FormControl} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-locker-detail',
  templateUrl: './locker-detail.component.html',
  styleUrls: ['./locker-detail.component.scss']
})
export class LockerDetailComponent implements OnInit {
  id: String = '';
  zoom: number = 8;  // esto deberia ser un servicio
  lat: number = 25.690290; // esto deberia ser un servicio
  lng: number = -100.315014;  // esto deberia ser un servicio
  arrayMarker:any=[];  
  count: number = 0;  

  id_locker:number = this.ServerUserService.getIdLocker();
  data;
  
  dataLockerLocation;
  responseLockerLocation;
  responseLockerDoorQuantity;
  responseLongitud;
  responseLatitud;
  typeUser;
  statusLocker;

  responseQuantityMonthAxisX=[];
  responseQuantityMonthAxisY=[];
  
  responseQuantityCarrierName=[];
  responseQuantityCarrierY=[];

  responseQuantityStatusName=[];
  responseQuantityStatusY=[];
  idUserCompany;

  userID;

  responseStatusCompartmentsBusy;
  responseStatusCompartmentsFail;
  responseStatusCompartmentsClosed;
  responseStatusCompartmentsOpen;
  
  dataTable=[];
  dataTableAux;
  dataColumn;
  hashLocker;
  longitud;
  latitud;

  quantity_metric ={
    percent_use_locker_total:'',
    percent_use_locker:'',
    user_recurrent:'',
    percent_delivery_success:'',
    most_used_size:'',
    percent_uptime_locker:'',
    total_user_locker:'',
    total_delivery_year:'',
    total_returned_year:'',
    total_pickup_year:'',
  };

  avg_time: '';
  delivered_monthAxisX = []; 
  delivered_monthAxisY = []; 
  pickup_monthAxisX = [];
  pickup_monthAxisY = [];
  returned_monthAxisX = [];
  returned_monthAxisY = [];

  carrierNames = [];
  carrierY = [];
  package_statusNames = [];
  package_statusY = [];
  package_sizeNames = [];
  package_sizeY = [];

  minDate: Date;
  maxDate: Date;
  dateStart;
  dateStartMin;
  dateStartMax;
  dateEndMin;
  dateEnd;
  timestampStart;
  timestampEnd;
  
  currentDate =  new Date();

  constructor(private route: ActivatedRoute, private _router: Router,private ServerUserService: ServerUserService) {}

  ngOnInit() {
    this.typeUser = localStorage.getItem("user_type");

    this.dateEnd = new FormControl( this.currentDate );
    this.dateEndMin = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1,this.currentDate.getDate()+1);
    
    this.dateStart = new FormControl(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1,this.currentDate.getDate()));
    this.dateStartMax = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),this.currentDate.getDate()-1);
    this.dateStartMin = new Date(2020, 0,1);

    
    this.timestampStart = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1,this.currentDate.getDate()).getTime();
    this.timestampEnd = this.currentDate.getTime();

    

    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });

    if( localStorage.getItem( "data" ) &&  localStorage.getItem( "data" ) != 'undefined' && localStorage.getItem( "data" ) != '' ){
      let data = JSON.parse(localStorage.getItem("data"));
      if( data.result.user_type == "LOCATARIO" ){
        if( localStorage.getItem("id_company") && localStorage.getItem("id_company") != "" && localStorage.getItem("id_company") != "undefine" ){
          this.idUserCompany = localStorage.getItem("id_company");
        }
      }    
    }
    if( localStorage.getItem("id_company") && localStorage.getItem("id_company") != "" && localStorage.getItem("id_company") != "undefine" ){
      this.idUserCompany = localStorage.getItem("id_company");
    }

    if( !localStorage.getItem("id_locker") || localStorage.getItem("id_locker") == '' || localStorage.getItem("id_locker") == 'undefined' ){

      localStorage.setItem("id_locker", JSON.stringify(this.ServerUserService.getIdLocker()));

    }else if( localStorage.getItem("id_locker") &&  localStorage.getItem("id_locker") != 'undefined' && JSON.parse( localStorage.getItem("id_locker") ) != JSON.stringify(this.ServerUserService.getIdLocker()) && this.ServerUserService.getIdLocker() != undefined ){
    }

    this.consultHistory( this.timestampStart, this.timestampEnd, this.currentDate.getFullYear());


    this.data = {
      "language" :localStorage.getItem('lenguage'),
      "id_locker":this.id_locker
      //"id_company": this.idUserCompany,
    };

    this.ServerUserService.get_query_locker_location( this.data ).subscribe( res => { 
      localStorage.setItem("ip_locker", res.LOCKERS[0].INFO[0].DISPOSITIVOS_PC[0].ip_pc_locker);

      this.statusLocker = res.LOCKERS[0].INFO[0].name_status_locker; 
      if( res.mensaje_return.ERROR == false ){
        res.LOCKERS.forEach(res_lockers => {
          res_lockers.INFO.forEach(element => {
            this.responseLockerDoorQuantity = element.door_quantity;
            
            if( element.locker_hash ){
              this.hashLocker = element.locker_hash; 
            }

            if(element.COORDINATES){
              this.responseLockerLocation = element.COORDINATES.locker_address;
              this.longitud = element.COORDINATES.longitud;
              this.latitud = element.COORDINATES.latitud;

              this.arrayMarker.push({
                lat: element.COORDINATES.latitud,
                lng: element.COORDINATES.longitud,
                label: 'V',
                draggable: false,
                id_locker: this.id_locker,
                locker_name: element.locker_name,
                locker_address:element.COORDINATES.locker_address
              });
          
              this.arrayMarker = JSON.stringify(this.arrayMarker);
          }else{
            this.arrayMarker = JSON.stringify([{}]);
          }
          });
        }); 

      
      this.ServerUserService.setCoordenate(this.arrayMarker);

      }else{
        this.responseLockerLocation = "";
        this.responseLockerDoorQuantity = "";
        this.responseLongitud = 0 ;
        this.responseLatitud = 0 ;
      }

    });
    
    this.data = {
      language :localStorage.getItem('lenguage'),
      year:"2020",
      id_locker: this.id_locker
    };
    this.ServerUserService.get_quantity_month( this.data ).subscribe( res => {
      if( res.mensaje_return.ERROR == false ){ 
        res.quantity_month.forEach(element => {
          this.responseQuantityMonthAxisX.push(element.mes_package);
          this.responseQuantityMonthAxisY.push(element.cant_package);
        });

      }else{
        this.responseQuantityMonthAxisX = [];
        this.responseQuantityMonthAxisY = [];
      }

    });

    
    this.data = {
      "language" :localStorage.getItem('lenguage'),
      "id_company": this.idUserCompany,
      "id_locker":this.id_locker
    };
    this.ServerUserService.get_quantity_carrier( this.data ).subscribe( res => {
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

    this.data = {
      "language" :localStorage.getItem('lenguage'),
      "id_company":this.idUserCompany,
      "id_locker":this.id_locker,
      "top": 3
    };
    this.ServerUserService.get_quantity_status( this.data ).subscribe( res => {
        if( res.mensaje_return.ERROR == false ){
          res.quantity_status.forEach(element => {
            this.responseQuantityStatusName.push(element.nombre_status);
            this.responseQuantityStatusY.push(element.total_per_status);
          });
        }else{
          
          this.responseQuantityStatusName=[];
            this.responseQuantityStatusY=[];
        }
    });

    this.data = {
      "language" :localStorage.getItem('lenguage'),
      "id_locker": this.id_locker,//this.id_locker,
      // "id_company":this.idUserCompany,
      //"id_user":1//this.userID
    };
    this.ServerUserService.get_query_consumer( this.data ).subscribe( res => {
      if( res.mensaje_return.ERROR == false ){
        res.result_consumer_package[0][1].forEach( element => {
          element.LOCKER.forEach( elementPackage => {

            if(this.typeUser == 2){
              elementPackage.PACKAGE.forEach( elementPackageUser => {
                this.dataTable.push({
                  name         : element.first_name+' '+element.surname,
                  tracking     : elementPackageUser.tracking_number,
                  door         : elementPackageUser.name_locker_module+elementPackageUser.door_number,
                  photo        : elementPackageUser.IMAGE.url_view_image_pickup,
                  signature    : elementPackageUser.IMAGE.url_view_imagen_signature,
                  delivered    : elementPackageUser.package_delivery_date,
                  collected    : elementPackageUser.package_pickup_date,
                  status       : elementPackageUser.status_package,
                  carrier      : elementPackageUser.courier_name,
                  code         : "Generar nuevo",
                  logs         : "",
                });
              });

            }else if(this.typeUser == 6){
              elementPackage.PACKAGE.forEach( elementPackageUser => {
                this.dataTable.push({
                  name         : element.first_name+' '+element.surname,
                  tracking     : elementPackageUser.tracking_number,
                  door         : elementPackageUser.name_locker_module+elementPackageUser.door_number,
                  photo        : elementPackageUser.IMAGE.url_view_image_pickup,
                  signature    : elementPackageUser.IMAGE.url_view_imagen_signature,
                  delivered    : elementPackageUser.package_delivery_date,
                  collected    : elementPackageUser.package_pickup_date,
                  status       : elementPackageUser.status_package,
                  carrier      : elementPackageUser.courier_name
                });
              });
            }
            
            
          });
      
        });
        this.dataColumn =JSON.stringify(Object.keys(this.dataTable[0]));
        this.dataTableAux = JSON.stringify(this.dataTable);
      }else{
        this.dataTable = [];
        this.dataTable.push({
          name_event    : 'NO RECORDS'
        });
      }

    });

    this.data = {
      "language" :localStorage.getItem('lenguage'),
      "id_locker":this.id_locker
    };
    this.ServerUserService.get_query_status_compartments_quantity( this.data ).subscribe( res => {
        if( res.mensaje_return.ERROR == false ){
          let temp;
          res.quantity_carrier.forEach(element => {
            if( element[0] == "BUSY" ){
             this.responseStatusCompartmentsBusy =  element[1][0].cant;
            }else if( element[0] == "FAIL" ){
              this.responseStatusCompartmentsFail =  element[1][0].cant;
            }else if( element[0] == "OPEN" ){
              this.responseStatusCompartmentsOpen =  element[1][0].cant;
            }else if( element[0] == "CLOSED" ){
              this.responseStatusCompartmentsClosed = element[1][0].cant;
            }
            
           });
        }else{
          
          this.responseStatusCompartmentsBusy=0;
          this.responseStatusCompartmentsFail=0;
          this.responseStatusCompartmentsClosed=0;
          this.responseStatusCompartmentsOpen=0;
        }
        
    });
    

  }

  addEvent( type ,event: MatDatepickerInputEvent<Date> ){
    
    if( type == "start" ){
      let current = new Date();

      this.dateEnd = new FormControl( new Date(event.value.getFullYear(), event.value.getMonth(),event.value.getDate()+1));
      this.dateEndMin = new Date(event.value.getFullYear(), event.value.getMonth(),event.value.getDate()+1);
      
      this.timestampStart = new Date(`${event.value.getFullYear()}/${event.value.getMonth()+1}/${event.value.getDate()} ${current.toTimeString()}`).getTime();
      current.setMonth(event.value.getMonth()+1);
      current.setDate(event.value.getDate()+1);

      let date = `${current.getFullYear()}/${current.getMonth()}/${current.getDate()} 23:58:58`;
      this.timestampEnd = new Date(date).getTime();

    }else if(type == "end"){
      this.timestampEnd = new Date(`${event.value.getFullYear()}/${event.value.getMonth()+1}/${event.value.getDate()} ${event.value.toTimeString()}`).getTime();
    }
    
   this.consultHistory( this.timestampStart, this.timestampEnd, this.currentDate.getFullYear());
  }

  onSeeCameras(id_locker){
    this._router.navigateByUrl("l-ad/locker/"+id_locker+"/cameras");
  }

  
  consultHistory( timestampStart, timestampEnd, year){
    this.data = {
      lenguage: "en",
      id_locker: this.id_locker,
      id_company: this.idUserCompany,
      package_delivered_month:true,
      package_returned_month:false,
      package_pickup_month:true,
      year: year,
      package_carrier:true,
      package_status:true,
      size_package:true,
      date_start: timestampStart,
      date_end: timestampEnd,
      user_recurrent:true,
      package_avg:true
    };

    this.ServerUserService.get_package_metric_locker( this.data ).subscribe( res => {

      if( res.mensaje_return.ERROR == false ){
        this.delivered_monthAxisX = []; 
        this.delivered_monthAxisY = []; 
        this.pickup_monthAxisX = [];
        this.pickup_monthAxisY = [];
        this.returned_monthAxisX = [];
        this.returned_monthAxisY = [];

        this.carrierNames = [];
        this.carrierY = [];
        this.package_statusNames = [];
        this.package_statusY = [];
        this.package_sizeNames = [];
        this.package_sizeY = [];
        let auxTime;
        
        this.quantity_metric = res.result_metric[0][1][0];
         auxTime = res.result_metric[0][1][0].avg_time;
          if( auxTime != null ){
            this.avg_time = auxTime.substr(0,5);
          }else{
            this.avg_time="";
          }
        if( res.result_metric[1][1] ){ 
          res.result_metric[1][1].forEach(element => {
            this.package_sizeNames.push(element.compartment_name);
            this.package_sizeY.push(element.countCompartment);
          });
        }else{
          this.package_sizeNames = [];
            this.package_sizeY = [];
        }

        if( res.result_metric[2][1] ){
          res.result_metric[2][1].forEach(element => {
            this.package_statusNames.push(element.package_status);
            this.package_statusY.push(element.total_status);
          });
        }else{
          this.package_statusNames = [];
          this.package_statusY = [];
        }

        if( res.result_metric[3][1] ){ 
          res.result_metric[3][1].forEach(element => {
            this.carrierNames.push(element.courier_name);
            this.carrierY.push(element.cant);
          });
        }else{
          this.carrierNames = [];
          this.carrierY = [];
        }

        this.returned_monthAxisX = [];
        this.returned_monthAxisY = [];
  
        if( res.result_metric[4][1] ){ 
          res.result_metric[4][1].forEach(element => {
            this.delivered_monthAxisX.push(element.mes_package);
            this.delivered_monthAxisY.push(element.cant_package);
          });
        }else{
          this.delivered_monthAxisX = [];
            this.delivered_monthAxisY = [];
        }
    
        if( res.result_metric[5][1] ){ 
          res.result_metric[5][1].forEach(element => {
            this.pickup_monthAxisX.push(element.mes_package);
            this.pickup_monthAxisY.push(element.cant_package);
          });
        }else{
          this.pickup_monthAxisX = [];
            this.pickup_monthAxisY = [];
        }
      }

    });
  }

  onResetLocker(id_locker){

    this.data = {
      "language" :localStorage.getItem('lenguage'),
      "id_locker":this.id_locker,
      "ip_address": "192.168.1.92",
      "locker_hash": this.hashLocker,
      "id_user":"2"//this.userID

    };
    this.ServerUserService.post_reboot_unit( this.data ).subscribe( res => {      

    });
  }
}

