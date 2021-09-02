import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerUserService } from '../../services/server-user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  new_password = '';
  confir_password = '';
  tMsg:string = "";
  typeMsg:string = '';
  removeMsg:boolean = true;
  styles_input:string = '';
  data;
  token;
  sub_domain;

  constructor( private _router: Router,
    private ServerUserService: ServerUserService ) {
      let url = this._router.parseUrl(this._router.url);
      this.token = url.queryParams['id'];
      this.sub_domain = localStorage.getItem("sub_domain")
     }

  ngOnInit() {}

  validate(){
    this.removeMsg = true;
    if(this.new_password != this.confir_password){
      this.typeMsg = 'error';
      this.tMsg = "message.reset_password_error";
      this.styles_input = 'border-input-error';
    }else if(this.new_password == '' || this.confir_password == ''){
      this.typeMsg = 'warning';
      this.tMsg = "message.reset_password_warning";
      this.styles_input = 'border-input-warning';
    }else if(!this.new_password.match(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/)){
      this.typeMsg = 'warning';
      this.tMsg = "message.regex_pass";
      this.styles_input = 'border-input-warning';
    }else{
      this.data = {	
        language:localStorage.getItem('lenguage'),
        token: this.token,
        password: this.new_password
      };
      this.ServerUserService.post_reset_password_user( this.data ).subscribe( res => {
        if( res.mensaje_return.ERROR == false ){
          localStorage.setItem("resetPass",'1');
          this._router.navigateByUrl("/login");
        }else{
          if(res.mensaje_return.CODE == 1103){
            this.typeMsg = 'error';
            this.tMsg = res.mensaje_return.ERROR_MENSAGGE;
            this.styles_input = 'border-input-error'; 
          }
        }
      });
    }
  }

}
