import { Component, OnInit } from '@angular/core';
import { ServerUserService } from '../../services/server-user.service';

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.scss']
})
export class ValidateEmailComponent implements OnInit {

  emailConfirmation = '';
  data;
  activeButton = false;
  buttonBackgorund = "";
  constructor( private ServerUserService: ServerUserService ) { }

  ngOnInit() {
    if( localStorage.getItem("emailConfirmation") && localStorage.getItem("emailConfirmation")!="" && localStorage.getItem("emailConfirmation")!="undefine" ){
      this.emailConfirmation = localStorage.getItem("emailConfirmation");
    }
  }
  SentLink(){
    if( this.emailConfirmation != '' ){
      this.activeButton = true;
      this.buttonBackgorund = "buttonBackgorund";
      this.data = {	
        language : localStorage.getItem('lenguage'),
        email_send: this.emailConfirmation
      };
      this.ServerUserService.post_resend_email_new_user( this.data ).subscribe( res => {
        if( res.mensaje_return.ERROR == false ){
          this.activeButton = false;
          this.buttonBackgorund = "";
        }
      });
      setTimeout( () => {
        this.activeButton = false;
        this.buttonBackgorund = "";
      },30000);
    }
  }

}
