import { Component, OnInit } from '@angular/core';
import { faAlignCenter } from '@fortawesome/free-solid-svg-icons';
import { ServerUserService } from '../../services/server-user.service';

@Component({
  selector: 'app-pay-balance',
  templateUrl: './pay-balance.component.html',
  styleUrls: ['./pay-balance.component.scss']
})
export class PayBalanceComponent implements OnInit {
  payment='0';
  amount;
  credit;
  step1; step2;
  pay_data;
  disableBtn = true;
  err=false;
  msg = false;
  type_msg;
  text_msg;
  constructor(private ServerUserService: ServerUserService) { }

  ngOnInit() {
    this.step1=true;

    let params= {
      "language" : localStorage.getItem('lenguage'),
      "id_user" : localStorage.getItem("id_user")
    };

    this.ServerUserService.get_query_balance_consumer(params).subscribe( res => {
      if( res.mensaje_return.ERROR == false ){
        let aux = res.balance_consumer.split(" ");
        this.credit = parseInt(aux[0]);
      }
    });
    if(localStorage.getItem("type_msg")){
      this.msg = true;
      this.type_msg = localStorage.getItem("type_msg");
      this.text_msg = localStorage.getItem("text_msg");
    }
    
  }

  onSelectedPay(e){
    this.payment = (e.target as HTMLInputElement).value;
    this.err = this.disableBtn = parseInt(this.payment)>9 ? false : true;
  }

  onSelectedQuantity(){
    this.err = this.disableBtn = parseInt(this.payment)>9 ? false : true;
  }

  onNextStepPay(){
    this.pay_data = JSON.stringify({"amount": this.payment});
    this.step1=false; 
    this.step2=true;
  }
}
