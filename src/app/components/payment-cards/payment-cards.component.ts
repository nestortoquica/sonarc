import { Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ServerUserService } from '../../services/server-user.service';
import { StripeToken} from "stripe-angular";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-payment-cards',
  templateUrl: './payment-cards.component.html',
  styleUrls: ['./payment-cards.component.scss']
})
export class PaymentCardsComponent implements OnInit {
  @Input() data;
  @Input() type;
  totalPay;
  bandCredit;
  slideSaveCard=false;
  pay_packages;
  errorMsg='';
  invalidError;
  err_msg='';
  cardReady;

  registeredCards;
  extraData = {name:'',address_city:'',address_line1:'',address_state:''};

  @ViewChild('stripeCard', {static: false}) stripeCard;
  constructor(
    private ServerUserService: ServerUserService, 
    private _router : Router,
    private translate: TranslateService) { }

  ngOnInit() {
    let data = JSON.parse(this.data);

    if(this.type == 'packages'){
      this.pay_packages = data.pay_packages;
      this.totalPay = data.totalPay;
      this.bandCredit = data.bandCredit;
    }else if(this.type == 'pay'){
      this.totalPay = data.amount;
    }

    let params= {
      "language" : localStorage.getItem('lenguage'),
      "id_user" : localStorage.getItem("id_user"),
    };

    this.ServerUserService.get_list_card(params).subscribe( res => {
      if(!res.mensaje_return.ERROR){
        this.registeredCards = res.card_return[0][1];
      }else{
        console.log("Err:: ", res.mensaje_return.ERROR_MENSAGGE)
      }
    });
  }

  onStripeInvalid( error:Error ){
    console.log('Validation Error', error)
  }
 
  onStripeError( error:Error ){
    console.error('Stripe error', error)
  }

  setStripeToken( token:StripeToken ){ //Pago con SALDO Y TARJETA o solo con TARJETA (save_card)
    if(this.type == 'packages'){
      let params={ 
        "language" : localStorage.getItem('lenguage'),
        "id_user" : parseInt(localStorage.getItem("id_user")),
        "pay_balance" : this.bandCredit=='true'? true:false,
        "device_session_id" : token.id,
        "save_card" : this.slideSaveCard,
        "pay_packages" : this.pay_packages
      };
      this.service_pay_expired_packages(params);  
    }else if(this.type == 'pay'){
      if(parseInt(this.totalPay)>9){
        let params={
          "language" :localStorage.getItem('lenguage'),
          "id_user" : parseInt(localStorage.getItem("id_user")),
          "device_session_id" : token.id,
          "amount" : parseInt(this.totalPay),
          "new_car" : true,
          "save_card" : this.slideSaveCard,
        };
        this.service_balance_consumer(params);
      }else
        this.translate.get('message.amount').subscribe( (text: string) => {
          this.err_msg = text;
        });
    } 
  }
  
  payment_registered_card(id){ //Pago con SALDO Y TARJETA GUARDADA o solo con TARJETA GUARDADA
    if(this.type == 'packages'){
      let params={ 
        "language" : localStorage.getItem('lenguage'),
        "id_user" : parseInt(localStorage.getItem("id_user")),
        "pay_balance" : this.bandCredit=='true'? true:false,
        "id_card_user" : parseInt(id),
        "pay_packages" : this.pay_packages
      };
      this.service_pay_expired_packages(params);
    }else if(this.type == 'pay'){
      if(parseInt(this.totalPay)>9){
        let params={
          "language" :localStorage.getItem('lenguage'),
          "id_user" : parseInt(localStorage.getItem("id_user")), 
          "amount" : parseInt(this.totalPay),
          "id_card_user" : parseInt(id),
          "new_car" : false
        };
        this.service_balance_consumer(params);
      }else
        this.translate.get('message.amount').subscribe( (text: string) => {
          this.err_msg = text;
        });
    }
  }

  payAmount(){
    this.errorMsg ='';
    if(this.extraData.name!='' &&
      this.extraData.address_city!='' &&
      this.extraData.address_line1!='' &&
      this.extraData.address_state!=''){
        this.stripeCard.createToken(this.extraData);
    }else
      this.errorMsg = "Falta información para realizar el pago";
  }

  service_pay_expired_packages(data){
    this.ServerUserService.post_pay_expired_packages(data).subscribe( res => {
      if(!res.mensaje_return.ERROR){
        this._router.navigateByUrl("/dashboard");
        window.scrollTo(0, 0);
        localStorage.setItem("add_address", 'success');
        this.translate.get('payments.successfully').subscribe( (text: string) => {
          localStorage.setItem("msgAddress", text);
        });
      }else{
        this._router.navigateByUrl("/dashboard");
        window.scrollTo(0, 0);
        localStorage.setItem("add_address", 'error');
        localStorage.setItem("msgAddress", res.mensaje_return.ERROR_MENSAGGE);
      }
    });
  }

  service_balance_consumer(data){
    this.ServerUserService.post_charge_balance_consumer(data).subscribe( res => {
      if(!res.mensaje_return.ERROR){
        window.location.reload();
        localStorage.setItem("type_msg", 'success');
        this.translate.get('payments.successfully').subscribe( (text: string) => {
          localStorage.setItem("text_msg", text);
        });
      }else{
        localStorage.setItem("type_msg", 'error');
        localStorage.setItem("text_msg", res.mensaje_return.ERROR_MENSAGGE);
      }
    });
  }

}
