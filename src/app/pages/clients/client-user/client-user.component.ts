import { Component, OnInit } from '@angular/core';
import { RetailService } from 'src/app/services/retail.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-client-user',
  templateUrl: './client-user.component.html',
  styleUrls: ['./client-user.component.scss']
})
export class ClientUserComponent implements OnInit {

  data;
  data_admin;
  users: User[];
  users_admin;
  columns;
  columns_admin;
  current_date = new Date();  
  unixTimeZeroCurrent = Date.parse(String(this.current_date));
  unixTimeZeroRegister;
  idUser

  constructor(
    private retailService: RetailService,
    private route: ActivatedRoute,
  ) {
    route.paramMap.subscribe(params=> {
      this.idUser = params.get('id')      
    })
   }

  ngOnInit() {
    this.columns = ['fullName', 'email', 'userType', 'employeId', 'activeDays', 'expires', 'status', 'actions']
    this.data = JSON.stringify(this.users)
    this.getUsers();
  }


  async getUsers(){   
    let activeDaysVerf;
    let dateRegistre;
    let activeDays;
    let data = {
      lenguage: localStorage.getItem('lenguage').toLowerCase(),
      id_company: localStorage.getItem('id_company'),
      token: localStorage.getItem('token')
    }
    let res:any = await this.retailService.getUser(data);    

    this.users=[]
    let current_date = new Date();
    let date_expire_password:any;
    res.result_return.forEach(e=>{      
      dateRegistre = new Date(e.date_register)


      date_expire_password   = new Date();
      date_expire_password.setDate(dateRegistre.getDate() + 90);

      this.unixTimeZeroRegister = Date.parse(String(dateRegistre));

      activeDaysVerf = this.unixTimeZeroCurrent - this.unixTimeZeroRegister;
      activeDays = (Math.round(activeDaysVerf / (1000*60*60*24)));

      this.users.push(      
        {
          fullName: e.first_name, 
          email: e.email, 
          employeId: e.company_employee_id, 
          activeDays: activeDays, 
          expires: (e.id_user_type == 11 || e.id_user_type == 12) ? e.date_expire_password : date_expire_password,
          actions: ['far fa-edit', 'far fa-trash-alt'], 
          id: e.id_user,
          id_status: e.id_status,
          status : e.status_user,
          userType:  {id: e.id_user_type, name: e.user_type}
        })
    })

    this.data = JSON.stringify(this.users)
  }

}
