
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { RetailService } from "src/app/services/retail.service";


@Component({
    selector: 'confirm-delete',
    templateUrl: './confirm-delete.html'
  })
  export class ConfirmDelete {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private retailService: RetailService
        ) {}

    async deleteUser(){
        let params = {
                language         : localStorage.getItem('lenguage').toLowerCase(),
                id_company       : Number(localStorage.getItem('id_company')),
                id_user          : Number(this.data.id),
                token            : localStorage.getItem('token')
        }

        localStorage.setItem('deleted', '1');
        let res:any =await this.retailService.deleteEmployeeAdmin(params)

        if(res.mensaje_return.ERROR == false){
            localStorage.setItem('deleted', '1');
        }else{
          localStorage.setItem('deleted', '0');
        }
    }
  }
  