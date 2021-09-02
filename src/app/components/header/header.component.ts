import { Component, OnInit } from '@angular/core';
import { ServerUserService } from '../../services/server-user.service';
import { environment } from "../../../environments/environment";
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  data;
  menu_user;
  menu_profile;
  alias_username:string;
  submenu;
  temp=[];
  currentURL;
  tab;
  tabs = [];
  domain;
  tabActive;
  tabSelection = "";
  res = '';
  absolutePath;
  ulr_tabs=[];
  showMenuMovil = 'hide-menu';
  expand = "expand_more";
  position = "position: initial;";
  type_user;
  lockers_title = false;
  //foundPague;

  numNoti=0;
  arrayNotiMenu;
  balance = 0;
  user_type; 
  
  constructor(
    private ServerUserService: ServerUserService,
    private _router : Router,
    private translate: TranslateService
    ) {
      this.domain = environment.domain;
      this.tabActive = "active-link"; //style
    }

  ngOnInit() { 
    

    if( this.ServerUserService.getData() || localStorage.getItem("data") ){
      if( !localStorage.getItem("data") || localStorage.getItem("data") == '' || localStorage.getItem("data") == 'undefined' ){
        localStorage.setItem("data", JSON.stringify(this.ServerUserService.getData()));
      }else if( localStorage.getItem("data") &&  localStorage.getItem("data") != 'undefined' && JSON.parse( localStorage.getItem("data") ) != JSON.stringify(this.ServerUserService.getData()) && this.ServerUserService.getData() != undefined ){
        localStorage.setItem("data", JSON.stringify(this.ServerUserService.getData()));
      }
    }else {
      this._router.navigateByUrl("/");
      localStorage.clear();
    }

    let params= {
      "language" : localStorage.getItem('lenguage'),
      "id_user" : localStorage.getItem("id_user")
    };

    this.ServerUserService.get_query_balance_consumer(params).subscribe( res => {
      if( res.mensaje_return.ERROR == false ){
        this.balance = res.balance_consumer;
      }
    });
    
    this.data = JSON.parse(localStorage.getItem("data"));
    this.type_user = this.data.result.id_user_type;

    if(this.data.direction_consumer && this.data.direction_consumer.consumer_code ){
      localStorage.setItem("consumer_code",this.data.direction_consumer.consumer_code);
    }

    if(  !localStorage.getItem("id_company") && this.data.data_company && this.data.data_company.id_company ){
      localStorage.setItem("id_company",this.data.data_company.id_company);
    }
    if(  !localStorage.getItem("id_user") && this.data.result && this.data.result.id_user ){
      localStorage.setItem("id_user",this.data.result.id_user);
    }
    if(  !localStorage.getItem("id_consumer") && this.data.direction_consumer && this.data.direction_consumer.id_consumer ){
      localStorage.setItem("id_consumer",this.data.direction_consumer.id_consumer);
    }

    this.menu_user = this.data.menu_user;
    this.currentURL = document.location.href;

    if(this.currentURL.indexOf("/pay-balance")!=-1){
      this.translate.get('payments.balance').subscribe( (text: string) => {
        this.tab = text;
      });
    }else if(this.currentURL.indexOf("/notifications")!=-1){
      this.translate.get('general.notifications').subscribe( (text: string) => {
        this.tab = text;
      });
    }else if(this.currentURL.indexOf("/profile")!=-1){
      this.translate.get('general.profile').subscribe( (text: string) => {
        this.tab = text;
      });
    }else if(this.currentURL.indexOf("/pay")!=-1){
      this.translate.get('general.Entregas').subscribe( (text1: string) => {
        this.translate.get('general.payment').subscribe( (text2: string) => {
          this.lockers_title = true;
          this.tabs.push(text1);
          this.tabs.push(text2);
        });
      });
    }
    //this.foundPague = 0;
    this.menu_user.forEach((element,index) => {
      if(element[0] == "MI_PERFIL"){
        this.menu_profile = element[1]; 
      }else{
        this.temp.push(element);
        if(element[0] == "DASHBOARD"){
          this.absolutePath = element[1][0].route_sub_menu;
        }
      }
      
      // menu  
      if( this.currentURL == (this.domain+element[1][0].route_sub_menu) ){
         this.tab = element[1][0].menu_name;
         this.tabSelection = element[0];
         //this.foundPague = 1;
      }
      if( element[0] == "LOCKERS"  ){
        let vec = this.currentURL.split('locker/');
        if(vec.length > 1 ){
          this.tabs = vec[1].split('/');
          this.ulr_tabs.push(this.tabs);
        }
      }
    });
    //redirect page
    // if( this.foundPague == 0 ){
    //   this._router.navigateByUrl('/page404');
    // }

    this.menu_user = this.temp;
    this.alias_username = this.data.result.alias_username;
  }

  get_notifications(data){
    this.ServerUserService.post_log_package_user(data).subscribe( res => {  
      if( res.mensaje_return.ERROR == false ){      
        if(data.last_date){
          this.arrayNotiMenu.pop();
          this.arrayNotiMenu.unshift(res.result_list[0][1])
        }else{
          this.arrayNotiMenu = res.result_list[0][1];
          this.numNoti = this.arrayNotiMenu.length;
        }

        let data_last_data = {
          "language" : localStorage.getItem('lenguage'),
          "id_user" : localStorage.getItem("id_user"),
          "top" : 5,
          "last_date" : this.arrayNotiMenu[0].registration_date
        }
        this.get_notifications(data_last_data);
      }
    },err => {
      if(err.status == 0){
        let data_last_data = {
          "language" : localStorage.getItem('lenguage'),
          "id_user" : localStorage.getItem("id_user"),
          "top" : 5,
          "last_date" : this.arrayNotiMenu[0].registration_date
        }
        this.get_notifications(data_last_data);
      }
      // console.log("ERR:: ", err)
    });
  }

  ngAfterViewInit(){
    // if( this.tabSelection != "" ){
    //   document.querySelector("#"+this.tabSelection).classList.add(this.tabActive);
    // }

    if( this.user_type === 3 ){
      let data = {
        "language" : localStorage.getItem('lenguage'),
        "id_user" : localStorage.getItem("id_user"),
        "top" : 5
        };
        
        this.get_notifications(data);
      }
  }

  onBreadcrumbs(tab, isLast){
    if(tab == 'Entregas'){
      this._router.navigateByUrl("/dashboard/deliveries");
    }else{
      if(!isLast){
        let path = this.currentURL.split(this.absolutePath);
        let url = path[1].split(tab+'/');
        this._router.navigateByUrl(this.absolutePath+url[0]+tab);
      }
    }
    
    
  }

  onShowMenuMovil(){
    if( this.showMenuMovil == 'hide-menu' ){
      this.showMenuMovil = "show-menu" ;
      this.expand = "expand_less";
      this.position = "position-fixed";
    }else{
      this.showMenuMovil = "hide-menu" ;
      this.expand = "expand_more";
      this.position = "position-initial";
    }
  }
  
  navigate(profile){
    if (profile.submenu_name=='Log Out') {
      localStorage.clear()
      this._router.navigateByUrl('login')
    }
    else this._router.navigateByUrl(profile.route_sub_menu)
  }
  

}
