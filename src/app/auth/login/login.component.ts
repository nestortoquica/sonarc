import { Component, OnInit, NgZone, Host, HostListener } from '@angular/core';
import { ServerUserService } from '../../services/server-user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  user = '';
  password = '';
  tMsg:string = "";
  typeMsg:string = '';
  removeMsg:boolean = true;
  styles_input:string = '';
  data;
  res;
  title:string;
  resetPass:boolean = false;
  time = false;
  type;
  url;
  sub_domain;
  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private _router: Router,
    private ServerUserService: ServerUserService,
    private translate: TranslateService,
    private component: AppComponent
    ) { 
      this.url = window.location.href; 
      this.sub_domain = this.url.split(':')[1].split('/')[2].split('.')[0];
      localStorage.setItem("sub_domain", this.sub_domain)

      if (localStorage.getItem('data')) {
      this.type = JSON.parse(localStorage.getItem('data')).result.user_type
        if (this.type=='LOCATARIO') {
          this._router.navigateByUrl('l-ad')
        }
        else if(this.type == 'LOCATARIO_RETAIL'){
          this._router.navigateByUrl('l-retail/locker')
        }
        else if (this.type == 'CLIENTE'){
          this._router.navigateByUrl('dashboard')
        }
      }
    }

  ngOnInit() {
    this.resetPass = (localStorage.getItem("resetPass") && localStorage.getItem("resetPass")!="" && localStorage.getItem("resetPass")!=undefined) ? true : false;
    if(!this.resetPass){
      this.translate.get('login.login_title').subscribe( (text: string) => {
        this.title = text;
      });
    }else{
      this.translate.get('login.title_reset_pass').subscribe( (text: string) => {
        this.title = text;
      });
      this.typeMsg = 'success';
      this.tMsg = "message.login_success";
    }
  }

  validate(){    
    this.removeMsg = true;
    if(this.user == '' || this.password == ''){
      this.typeMsg = 'warning';
      this.tMsg = "message.login_warning";
      this.styles_input = 'border-input-warning';
    }else{   
      this.data = { lenguage: "en", user: this.user, pass: this.password };
      this.ServerUserService.post_validate_user_password( this.data ).subscribe( res => {        
        if( res.mensaje_return.ERROR == true ){
          this.time = false
          this.typeMsg = 'error';
          this.tMsg = "message.login_error";
          this.styles_input = 'border-input-error';
          setTimeout(() => {
            this.tMsg = ''
            this.time = true
          }, 5000);
        }else{
          localStorage.setItem('token', res.token)
          localStorage.setItem("data", JSON.stringify(res))
          this.ServerUserService.setData(res);
          if( res.result && res.result.id_user_type ){
            localStorage.setItem("user_type",res.result.id_user_type);
          }
          if(  res.data_company && res.data_company.id_company ){
            localStorage.setItem("id_company",res.data_company.id_company);
          }
          if(  res.direction_consumer && res.direction_consumer.id_consumer ){
            localStorage.setItem("id_consumer",res.direction_consumer.id_consumer);
          }
          if(  res.result && res.result.id_user ){
            localStorage.setItem("id_user",res.result.id_user);
          }
          if(  res.direction_consumer && res.direction_consumer.consumer_code ){
            localStorage.setItem("consumer_code",res.direction_consumer.consumer_code);
          }        
          if(  res.direction_consumer && res.direction_consumer.pref_low_height ){
            localStorage.setItem("pref_low_height",res.direction_consumer.pref_low_height);
          }
          if(  res.result && res.result.acronym_language ){
            localStorage.setItem( "lenguage",res.result.acronym_language );
          }
          localStorage.removeItem("resetPass");
          ! this.ngZone.run(() => this._router.navigateByUrl(res.menu_user[0][1][0].route_sub_menu))
        }
      });
    }
  }
  onFocus(){
    // if( this.tMsg != '' || this.styles_input != '' ){
    //   this.tMsg = '';
    //   this.styles_input = '';
    // }
  }
}
