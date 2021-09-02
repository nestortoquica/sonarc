import { Component, OnInit } from '@angular/core';
import { ServerUserService } from '../../services/server-user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  user_email = '';
  tMsg:string = "";
  typeMsg:string = '';
  removeMsg:boolean = true;
  styles_input:string = '';
  sub_domain:string = '';
  data;

  constructor( private ServerUserService: ServerUserService ) { this.sub_domain = localStorage.getItem("sub_domain") }
  ngOnInit() {}
  validate(){
    this.removeMsg = true;
    if(this.user_email == ''){
      this.typeMsg = 'warning';
      this.tMsg = "message.forgot_passswor_warning";
      this.styles_input = "border-input-warning";
    }else{
      this.data = {	
        language : localStorage.getItem('lenguage'),
        email_send: this.user_email
      };
      this.ServerUserService.post_forgot_password_user( this.data ).subscribe( res => {
        if( res.mensaje_return.ERROR == false ){
          this.typeMsg = 'success';
          this.tMsg = "message.forgot_passswor_success";
          this.styles_input = "border-input-success";
        }else{
          if(res.mensaje_return.CODE == 1102){
            this.typeMsg = 'error';
            this.tMsg = res.mensaje_return.ERROR_MENSAGGE;
            this.styles_input = 'border-input-error'; 
          }
          if(res.mensaje_return.CODE == 1203){
            this.typeMsg = 'error';
            this.tMsg = res.mensaje_return.ERROR_MENSAGGE;
            this.styles_input = 'border-input-error'; 
          }
        }
      });
    }
  }

}
