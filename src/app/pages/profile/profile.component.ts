import { Component, OnInit } from '@angular/core';
import { ServerUserService } from '../../services/server-user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  styles_input:string = '';
  first_name;
  surname;
  apell;
  address;
  address1;
  country;
  phone;
  email;
  password;
  repeat_pass='';
  trfc;
  company_name;
  data;
  company: boolean = false;
  news: boolean = false;
  languages = [];
  params;
  lenguajeLogin;
  opcionLanguage;
  emailAlternate;
  slideEmail;
  slideEmail2;
  slideSms;
  user;
  msg = {type_msg:'', text_msg:''};
  band = false;

  constructor(private ServerUserService: ServerUserService,
    private translate: TranslateService) { 
  }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem("data"));

    this.first_name = this.data.result.first_name;
    this.surname = this.data.result.surname;
    this.user = this.data.result.id_user_type;
    if(this.data.direction_consumer){
      this.phone = this.data.direction_consumer.alternative_tlf;
      this.emailAlternate  = this.data.direction_consumer.alternative_email;
      this.slideEmail2 = this.data.direction_consumer.pref_contact_email == 0 ||  this.data.direction_consumer.pref_contact_email == null ? false : true;
      this.slideSms = this.data.direction_consumer.pref_contact_tlf == 0 || this.data.direction_consumer.pref_contact_tlf == null ? false : true;
    }
    this.opcionLanguage = this.data.result.id_language;
    this.email = this.data.result.email;
    this.slideEmail = true;
    

    if(this.data.data_company){
      this.company = true;
      this.company_name = this.data.data_company.company_name;
      this.trfc = this.data.data_company.trfc;
    }

    if( !this.company ){
      this.params = {
        "language" :"en"
      };
      this.ServerUserService.get_list_lenguaje( this.params ).subscribe( res => {
        if( res.mensaje_return.ERROR == false ){
          if( res.idioma.length > 0 ){
            let selected;

            res.idioma.forEach(( element ) => {
              selected= parseInt(element.id_language) ==  this.opcionLanguage ? 'selected' : '';

              this.languages.push({
                id        : element.id_language,
                value     : element.language_name,
                selected  : selected            
              });
            });
          }
        }
      });
    }
  }

  saveProfile(){
    if(this.repeat_pass != ''){
      if(this.password == this.repeat_pass){
        this.update_user();
      }
    }else
      this.update_user();
  }

  update_user(){ 
    let data = {
      "id_language" : this.opcionLanguage,
      "id_consumer": this.data.direction_consumer.id_consumer,
      "first_name": this.first_name,
      "surname": this.surname,
      "alternative_email": this.emailAlternate,
      "alternative_tlf": this.phone,
      "pref_low_height": this.data.direction_consumer.pref_low_height,
      "pref_contact_email": this.slideEmail2,
      "pref_contact_tlf": this.slideSms,
      "password": this.password
      };
    
    this.ServerUserService.update_update_data_user(data).subscribe( res => {
      if( !res.mensaje_return.ERROR ){ 
        let lang =  this.opcionLanguage == '1' ? 'es' : 'en';
        localStorage.setItem("lenguage", lang);

        this.data.result.first_name = this.first_name;
        this.data.result.surname = this.surname;
        if(this.data.direction_consumer){
          this.data.direction_consumer.alternative_tlf = this.phone;
          this.data.direction_consumer.alternative_email = this.emailAlternate;
        }
        this.data.result.id_language = this.opcionLanguage;
        this.data.result.language_name = this.opcionLanguage == '1' ? "ESPAÑOL" : "ENGLISH"
        localStorage.setItem("data", JSON.stringify(this.data))
        window.scrollTo(0, 0);
        this.translate.get('profile.successfully').subscribe( (text: string) => {
          this.msg = {type_msg:'success', text_msg: text}
        });
      }else{
        this.msg = {type_msg:'error', text_msg: res.mensaje_return.ERROR_MENSAGGE}
      }
      this.band = true;
    });
  }

}
