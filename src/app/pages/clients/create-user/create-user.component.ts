import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RetailService } from 'src/app/services/retail.service';
import { ServerUserService } from 'src/app/services/server-user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})

export class CreateUserComponent implements OnInit {
  name;
  email;
  id=527
  password;
  cpassword;
  lang;
  company;
  show = false;
  disabled = true
  user: User
  user_temp: User
  breakpoint: number;
  edit;
  userType
  types=[]
  cllas_err = ''
  element_edit:any;
  disabled_input_employee=false;
  regexp: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  constructor(
    private router: Router,
    private param: ActivatedRoute,
    private retail: RetailService,
    private serverUserService: ServerUserService
  ) {
    this.param.paramMap.subscribe(p => {
      this.user = JSON.parse(p.get('id'));            
      this.user_temp = JSON.parse(p.get('id'));      
    })
    this.edit = document.location.href.split('/').pop();
  }
  onSelect(event){    
    if(event == 1 || event == 3 || event == 4){
      this.disabled_input_employee = false;
    }else{
      this.disabled_input_employee = true;
    }
  }

  ngOnInit() {
    if(localStorage.getItem("update_user")){
      this.user = JSON.parse(localStorage.getItem("update_user"));
      this.user_temp = JSON.parse(localStorage.getItem("update_user"));
    }


    this.lang = localStorage.getItem('lenguage').toLowerCase();
    this.company = localStorage.getItem('id_company');
    this.edit=='edit'?this.edit=true:this.edit=false;
    this.breakpoint = (window.innerWidth <= 900) ? 1 : 3;
    this.getUserTypes()
  }

  async getUserTypes(){
    let res: any = await this.retail.getUserTypes(this.lang.toLowerCase())    
    res.list_type_user.forEach((element) => {
      //if(element.id_type_employee != 2)
        this.types.push(element)
    })
    //this.types = res.list_type_user    
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 900) ? 1 : 3;
  }

  generate(){
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 10; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
   this.show = true
   this.password = result.join('');
   this.cpassword = this.password;
  }

  hidePassword(){
    this.show = !this.show;
  }


  back(){
    this.router.navigateByUrl('l-retail/user')
  }

  async createUser(){
    let body = {
      lenguage: this.lang,
      id_company: this.company,
      days_to_expire: 90,
      data_employee: [{
          full_name: this.name,
          email: this.email,
          company_employee_id: this.id,
          password: this.password,
          id_type_employee: this.userType
        }]
    };
    let res = await this.retail.createUser(body);
    this.router.navigateByUrl('l-retail/user')
  } 

  async editUser(){
    let validate_send_data:boolean = false;
     if(this.regexp.test(this.user.email)){

      let body = {
        language: this.lang,
        id_company: this.company,
        days_to_expire: 90,
        data_employee: [{
            password                 : (this.password) ? this.password : undefined,
            id_type_employee         : undefined,
            full_name                : (this.user_temp.fullName != this.user.fullName) ? this.user.fullName : undefined ,
            email                    : undefined
          }]
      };
 
      this.serverUserService.validatedObjecEmpty(body.data_employee)  
      body.data_employee.forEach((e) => {
        if(e.password || e.full_name || e.email){                    
          e.id_type_employee =  this.user_temp.userType.id,
          e.email =  this.user_temp.email,
          validate_send_data=true;
        }
      })    
      if(validate_send_data){          
        
        let res:any = await this.retail.udpateEmployee(body);
        if(res.mensaje_return.ERROR == false){
          this.cllas_err='exito'
          localStorage.removeItem('update_user');
          setTimeout(() => {
            this.cllas_err = '';
            this.router.navigateByUrl('l-retail/user') 
          }, 2000);
        }else{
          this.cllas_err='fail'
        }
        
      }
      
     }else{
       console.log("correo invalido")

     }
     
  }
}
