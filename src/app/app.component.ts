import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  lenguage = 'en';
  id: number;
  lat:number;
  lon:number;
  time
  constructor(
    private translate: TranslateService,
    private router: Router
    ) {
    if( localStorage.getItem("lenguage") && localStorage.getItem("lenguage")!="" && localStorage.getItem("lenguage")!="undefine" ){
      this.lenguage = localStorage.getItem("lenguage");
    }
    translate.setDefaultLang(this.lenguage.toLowerCase());
    localStorage.setItem("lenguage", this.lenguage);
    
  }
  setId(id){this.id = id;}
  getId(){return this.id;}
  
  
  move(){
    clearTimeout(this.time)
    this.time = setTimeout(()=>{this.navigate()}, 600000)
  }

  navigate(){
    localStorage.clear()
    this.router.navigateByUrl('login');
  }
  
}