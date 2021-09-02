
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { RetailService } from "src/app/services/retail.service";
import { Router } from '@angular/router';


@Component({
    selector: 'update-email',
    templateUrl: './update-email.html',
    styleUrls: ['./update-email.component.scss']
  })
  export class UpdateEmail {
    email_change;
    email_package
    styles_input:string = '';

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private retailService: RetailService,
        private router: Router,
        ) {}


     ngOnInit(): void {         
         this.email_change = this.data.email;
     }

     async updateEmail(){
         if(this.data.email!= this.email_change)
             localStorage.setItem("update-email-consumer", "true");
         let params = {
            leng: localStorage.getItem('lenguage').toLowerCase(),
            id_company         : Number(localStorage.getItem('id_company')),
            email              : this.data.email,
            email_change       : this.email_change,
            id_package_code    : this.data.id_package_code,
            inLocker           : this.data.inLocker,
            order              : this.data.order,            
            token              : localStorage.getItem('token')
          }
          await this.retailService.changeClientEmail(params);           
          //if(res.mensaje_return.ERROR != false)
          //    this.router.navigateByUrl('l-retail/order')
          //console.log('res => ',res);
      }
  }
  