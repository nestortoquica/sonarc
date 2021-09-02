import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServerUserService } from '../../services/server-user.service';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.scss']
})
export class CamerasComponent implements OnInit {
  currentURL;
  id_locker;
  idUserCompany;
  data;
  dataResultCamera;
  ipAddress;
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private ServerUserService: ServerUserService
  ) { 
    this.ipAddress = localStorage.getItem("ip_locker");
  }

  ngOnInit() {
     localStorage.removeItem('url_cam_event');
    this.route.params.subscribe((params: Params) => {
      this.id_locker = params.id;

    });
   
    if( localStorage.getItem( "data" ) &&  localStorage.getItem( "data" ) != 'undefined' && localStorage.getItem( "data" ) != '' ){
      let data = JSON.parse(localStorage.getItem("data"));
      
      if( data.result.user_type == "LOCATARIO" ){
        this.idUserCompany = data.data_company.id_company;
      }    
    }

    this.data = {
      "language" :localStorage.getItem('lenguage'),
      "ip_address":this.ipAddress
      //"id_locker":2,
      //"id_company": this.idUserCompany,
    };
    this.ServerUserService.get_list_cam_locker( this.data ).subscribe( res => {       
      if( res.mensaje_return.ERROR == false ){
          for(var a = 0; a < res.result_monitor.length; a++){
            this.dataResultCamera.push({
              id             : res.result_monitor[a].id,
              ip_address     : this.data.ip_address,
              monitor_name   : res.result_monitor[a].monitor_name,
              url_view       : res.result_monitor[a].url_view,
           })
        }  
      }else{
         this.dataResultCamera = [];        
      }

     this.ServerUserService.setdataCamera(this.dataResultCamera);

    });

    this.dataResultCamera = [];
  }

  onSeeCamera(camera){
    let cam = camera+1;
    this._router.navigateByUrl("l-ad/locker/"+this.id_locker+"/cameras/"+cam);
  }

}
