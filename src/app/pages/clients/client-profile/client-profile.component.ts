import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ServerUserService } from 'src/app/services/server-user.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {
  password = true;
  type = 'password';
  fname;
  sname;
  email;
  company
  pass;
  cPass;
  address;
  lang: string;
  data
  userType
  id_company
  id_user
  msg
  constructor(
    private translate: TranslateService, 
    private serverUserService : ServerUserService){ }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('data'));
    console.log("this.data", this.data);
    this.email = this.data.data_company.email
    this.company = this.data.data_company.company_name
    this.id_company = this.data.data_company.id_user
    this.fname = this.data.data_company.first_name
    this.sname = this.data.data_company.surname
    this.userType = this.data.data_company.user_type
    this.address = 'Av. del Peñón 355, Moctezuma 2da Secc, Venustiano Carranza, 15530 Ciudad de México, CDMX'
  }

  hidePassword(){
    this.password = !this.password;
    this.type = this.password?'password':'text'
  }

  submit(){    
    console.log("this.pass, this.cPass", this.pass, this.cPass);
    //this.lang?this.translate.use(this.lang.toLowerCase()):null;
    //this.lang?localStorage.setItem('lenguage', this.lang):null;
    this.update_user();
  }

  update_user(){ 
    let data = {
      id_language   : (this.lang=="ES") ? 1 : 2,
      first_name    : this.fname,
      surname       : this.sname,
      password      : this.pass,
      company       : this.id_company,
      id_user       : this.id_user,
      userType      : this.userType,
      token         : this.data.data_company.token
    };
    
    this.serverUserService.update_update_data_user(data).subscribe( res => {
      if( !res.mensaje_return.ERROR ){ 
        this.data.result.first_name = this.fname;
        this.data.result.surname = this.sname;        
        localStorage.setItem("data", JSON.stringify(this.data))
      }else{
        this.msg = {type_msg:'error', text_msg: res.mensaje_return.ERROR_MENSAGGE}
      }
      
    });

  }

}
