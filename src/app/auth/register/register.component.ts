import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment"
import { ServerUserService } from '../../services/server-user.service';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name:string = "";
  apell:string = "";
  email:string = "";
  password:string = "";
  confirmPassword:string = "";
  check_terms:boolean = false;
  typeMsg:string = '';
  removeMsg:boolean = true;
  styles_input:string = '';
  code_cell="";
  cell="";
  validation_code:string = "";
  buttonConfirmar = true;
  params;
  validate_code="";
  disabledFields = false;
  validateNumber = false;
  emailValido = false;

  errorNames:string;
  errorEmail:string;
  errorPassword:string;
  errorCode:string;

  public_key_recaptcha:string;
  recaptchaCheck:boolean; 

  currentDate;
  year;
  constructor(
    private ServerUserService: ServerUserService,
    private _router: Router,
    private translate: TranslateService,
  ) {
    this.public_key_recaptcha = environment.public_key_recaptcha;
    this.recaptchaCheck = false;
  }

  ngOnInit() {
    this.currentDate = new Date();
    this.year = this.currentDate.getFullYear();
  }
  
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.recaptchaCheck = captchaResponse != null?true:false;
  }

  validate(){    
    let check = false;
    this.removeMsg = true;
      
      if( this.name == '' || this.apell == '' || !this.name.match(/^\w+[a-zA-Z]+$/) || !this.apell.match(/^\w+[a-zA-Z]+$/) ){
        this.typeMsg = 'error';
        this.translate.get('message.register_first_name_error').subscribe( (text: string) => {
          this.errorNames = text;
        });
        check = true;
      }else{
        this.errorNames = '';
      }
      if( this.email == '' || !this.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/)  ){
        this.typeMsg = 'error';
        this.translate.get('message.error_email').subscribe( (text: string) => {
          this.errorEmail = text;
        });
        check = true;
      }else{
        this.errorEmail = '';
      }

      if( this.password == '' || this.confirmPassword == '' || this.password != this.confirmPassword ){
        this.typeMsg = 'error';
        this.translate.get('message.register_password_no_match').subscribe( (text: string) => {
          this.errorPassword = text;
        }); 
        check = true;  
      }else{
        this.errorPassword = '';
      }

      if(!this.password.match(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/)){
        this.typeMsg = 'error';
        this.translate.get('message.regex_pass').subscribe( (text: string) => {
          this.errorPassword = text;
        });
      }else{
        this.errorPassword = '';
      }

      if( this.validateNumber == false  ){
        this.typeMsg = 'error';
        this.translate.get('message.unconfirmed_phone').subscribe( (text: string) => {
          this.errorCode = text;
        });
        check = true;  
      }else{
        this.errorCode = '';
      }
      
      if(check == false){ 
        let  terms = this.check_terms ? 1: 0;
        this.params = {
          "language":localStorage.getItem('lenguage'),
          "surname": this.apell,
          "first_name": this.name,
          "user": this.email,
          "password": this.password,
          "number_phone": this.code_cell+""+this.cell,
          "accept_term_condition":terms, 
          "id_user_type":3, 
          "id_registration_method":1 
        }
  
        this.ServerUserService.post_register_new_user( this.params ).subscribe( res => {        
          if( res.mensaje_return.ERROR == false ){
            localStorage.setItem("emailConfirmation",this.email);
            this._router.navigateByUrl("/validate-email");
          }
        });
      }
  }

  buttonValidate(){
      if( this.code_cell != "" && this.cell != "" && /^[0-9]+$/gm.test(this.cell) && this.validateNumber == false ){
        this.params = { "validate_number_phone": this.code_cell+""+this.cell};
        this.ServerUserService.post_send_validate_number_phone( this.params ).subscribe( res => {
          if( res.mensaje_return.ERROR == false ){
            this.validate_code = res.validate_code;
            this.buttonConfirmar = false;
          }
        });
      }
  }

  buttonConfirm(){
    if( this.code_cell != "" && this.cell != "" && /^[0-9]+$/gm.test(this.cell) && this.validation_code != "" && /^[0-9]+$/gm.test(this.validation_code) && this.validateNumber == false ){     
      this.buttonConfirmar = true;
      setTimeout(
        () => {
          this.buttonConfirmar = false;
        },5000);
      if( this.validate_code == this.validation_code ){
        this.params = {
          "validate_number_phone": this.code_cell+""+this.cell ,
          "validate_code" : this.validation_code
        }
        this.ServerUserService.post_validate_code( this.params ).subscribe( res => {
          if( res.mensaje_return.ERROR == false ){
            this.validateNumber = true;
            document.getElementById("btnValidationCode").style.display="none";
            document.getElementById("checkVal").style.display="block";
            this.errorCode = '';
          }
        });
      }else{
        this.typeMsg = 'error';
        this.translate.get('message.code_invalid').subscribe( (text: string) => {
          this.errorCode = text;
        });
        this.errorCode = "";
      }
    }    
  }


  focusOutFunction(){   
    if( this.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/) ){
      this.params = {
        "language": localStorage.getItem('lenguage'),
        "user": this.email
      }
      this.ServerUserService.post_validate_user( this.params ).subscribe( res => {
        if( res.mensaje_return.ERROR == true ){
          this.emailValido = false;
          this.errorEmail = "*"+res.mensaje_return.ERROR_MENSAGGE;
          document.getElementById("email").focus();
          this.name = this.email;
        }else{
          this.emailValido = true;
        }
      });
    }else{   
      this.translate.get('message.error_email').subscribe( (text: string) => {
        this.errorEmail = text;
      });
    }


  }


}
