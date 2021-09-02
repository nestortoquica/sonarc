import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { environment } from "../../../../environments/environment";
let HeaderClientComponent = class HeaderClientComponent {
    constructor(ServerUserService, _router, translate) {
        this.ServerUserService = ServerUserService;
        this._router = _router;
        this.translate = translate;
        this.temp = [];
        this.tabs = [];
        this.tabSelection = "";
        this.res = '';
        this.showMenuMovil = 'hide-menu';
        this.expand = "expand_more";
        this.position = "position: initial;";
        this.lockers_title = false;
        this.numNoti = 0;
        this.balance = 0;
        this.hidden = false;
        this.domain = environment.domain;
        this.tabActive = "active-link"; //style
        JSON.parse(localStorage.getItem("data"));
        this._router.events.subscribe((val) => {
            if (val.url) {
                this.breadUrl = val.url.split('/').pop();
            }
        });
    }
    ngOnInit() {
        this.lockerName = localStorage.getItem('locker_name');
        this.lang = localStorage.getItem('lenguage');
        if (this.ServerUserService.getData() || localStorage.getItem("data")) {
            if (!localStorage.getItem("data") || localStorage.getItem("data") == '' || localStorage.getItem("data") == 'undefined') {
                localStorage.setItem("data", JSON.stringify(this.ServerUserService.getData()));
            }
            else if (localStorage.getItem("data") && localStorage.getItem("data") != 'undefined' && JSON.parse(localStorage.getItem("data")) != JSON.stringify(this.ServerUserService.getData()) && this.ServerUserService.getData() != undefined) {
                localStorage.setItem("data", JSON.stringify(this.ServerUserService.getData()));
            }
        }
        else {
            this._router.navigateByUrl("/");
            localStorage.clear();
        }
        let params = {
            "language": localStorage.getItem('lenguage'),
            "id_user": localStorage.getItem("id_user")
        };
        /*
    
        this.ServerUserService.get_query_balance_consumer(params).subscribe( res => {
          if( res.mensaje_return.ERROR == false ){
            this.balance = res.balance_consumer;
          }
        });
        /
        
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
    
        if(this.currentURL.indexOf("/notifications")!=-1){
          this.translate.get('general.notifications').subscribe( (text: string) => {
            this.tab = text;
          });
        }else if(this.currentURL.indexOf("/profile")!=-1){
          this.translate.get('general.profile').subscribe( (text: string) => {
            this.tab = text;
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
          this.vecTemp = this.currentURL.split('l-retail/')[1]
          if(element[0] == "LOCKERS"){
            let vec = this.currentURL.split('locker/');
            if(vec.length > 1 ){
              this.tabs.push(localStorage.getItem('locker_name'))
            }
          }
          if (element[0] == 'USERS') {
            let vec = this.currentURL.split('user/');
            if (this.currentURL.split('/').pop()!='edit') {
              if (vec.length > 1) {
                this.tabs = vec[1].split('/')
              }
            } else {
              if (vec.length > 1) {
                this.tabs = ['edit']
              }
            }
          }
        });
    
        this.menu_user = this.temp;
        this.alias_username = this.data.result.alias_username;
      }
    
      toggleBadgeVisibility() {
        this.hidden = true;
      }
    
      get_notifications(data){
        this.ServerUserService.post_log_package_user(data).subscribe( res => {
          console.log(res);
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
        }
        if (tab == 'locker'){
          this._router.navigateByUrl('/l-retail/locker')
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
      
      menuItem(){
        this.showMenuMovil = "hide-menu"
      }
      
    
    } 
    }
};
HeaderClientComponent = __decorate([
    Component({
        selector: 'app-menu-client',
        templateUrl: './header-client.component.html',
        styleUrls: ['./header-client.component.scss']
    })
], HeaderClientComponent);
export { HeaderClientComponent };
/*

this.ServerUserService.get_query_balance_consumer(params).subscribe( res => {
  if( res.mensaje_return.ERROR == false ){
    this.balance = res.balance_consumer;
  }
});
/

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

if(this.currentURL.indexOf("/notifications")!=-1){
  this.translate.get('general.notifications').subscribe( (text: string) => {
    this.tab = text;
  });
}else if(this.currentURL.indexOf("/profile")!=-1){
  this.translate.get('general.profile').subscribe( (text: string) => {
    this.tab = text;
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
  this.vecTemp = this.currentURL.split('l-retail/')[1]
  if(element[0] == "LOCKERS"){
    let vec = this.currentURL.split('locker/');
    if(vec.length > 1 ){
      this.tabs.push(localStorage.getItem('locker_name'))
    }
  }
  if (element[0] == 'USERS') {
    let vec = this.currentURL.split('user/');
    if (this.currentURL.split('/').pop()!='edit') {
      if (vec.length > 1) {
        this.tabs = vec[1].split('/')
      }
    } else {
      if (vec.length > 1) {
        this.tabs = ['edit']
      }
    }
  }
});

this.menu_user = this.temp;
this.alias_username = this.data.result.alias_username;
}

toggleBadgeVisibility() {
this.hidden = true;
}

get_notifications(data){
this.ServerUserService.post_log_package_user(data).subscribe( res => {
  console.log(res);
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
}
if (tab == 'locker'){
  this._router.navigateByUrl('/l-retail/locker')
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

menuItem(){
this.showMenuMovil = "hide-menu"
}


} 
//# sourceMappingURL=header-client.component.js.map