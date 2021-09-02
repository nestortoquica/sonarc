import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ServerUserService } from '../../services/server-user.service';
import { FileHandle } from '../locker-create/drag-drop.directive';

@Component({
  selector: 'app-locker-create',
  templateUrl: './locker-create.component.html',
  styleUrls: ['./locker-create.component.scss']
})
export class LockerCreateComponent implements OnInit {
  zoom: number = 8;  // esto deberia ser un servicio
  lat: number = 25.690290; // esto deberia ser un servicio
  lng: number = -100.315014;  // esto deberia ser un servicio
  arrayMarker:any=[];  
  files: FileHandle[] = [];

  add_mod=true;
  choose_mod= false;
  modal_mod= false;

  htmlContent:string;
  btnDelete = null;
  selected_serial;
  contMod=0;
  items = [{'id':this.contMod, type:'cm'}];

  serial;
  company=[];
  location;
  type_locker;
  privacy_locker;
  code_locker;
  serial_status;
  serial_action;
  codeInvitedQ = false;
  codeInvitedA = false;
  codeInvited;
  questionCode;
  typePayment;
  subscriptionQ;
  cost;

  auxLockers =[];
  arrAuxMarker;

  id_locker;
  locker_name;
  locker_address = "";

  regex_ip = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  regex_serial = /^[0-9A-Z]{20}$/; 

  constructor(
    private ServerUserService: ServerUserService
  ) { }

  ngOnInit() {
    this.get_list_company();
    this.get_lockersMap();
  }

  filesDropped(files: FileHandle[]): void {
    let extension = (files[0].name.substring(files[0].name.lastIndexOf("."))).toLowerCase();
    if(extension == ".xls" ||  extension == ".csv" || extension == ".xlsx")
      this.files = files;
    else
      console.log('')
  }


  get_list_company(){
    let data = {
      "language" :localStorage.getItem('lenguage')
    };

    this.ServerUserService.get_query_company(data).subscribe( res => {
      if( res.mensaje_return.ERROR == false){
        this.company = res.result_return[0][1];
      }else{
        this.company = [];
      }
    });
    
  }

  get_lockersMap(){
    let count= 0; 
    let data = {
      "language" :localStorage.getItem('lenguage')
    };

    this.ServerUserService.get_query_locker_company(data).subscribe( res => {
      if( res.mensaje_return.ERROR == false ){     

        res.locker_company[0][1].forEach(element => {
          this.auxLockers.push(res.locker_company[0][1][count++]);

          this.arrayMarker.push({
            lat:             element.latitud,
            lng:             element.longitud,
            label:           'V',
            draggable:       false,
            id_locker:       element.id_locker,
            locker_name:     element.locker_name,
            locker_address:  element.locker_address
          });
        });
        this.arrAuxMarker = this.arrayMarker;
        this.arrayMarker = JSON.stringify(this.arrayMarker);
      }else{
        this.arrayMarker = JSON.stringify([{}]);
      }      
    });
  }

  onCheckedPrivacy(){
    if(this.privacy_locker == "private"){
      this.codeInvitedQ = true;
    }else{
      this.codeInvitedQ = false;
    }
  }

  onCheckedCode(){
    if(this.questionCode == "yes"){
      this.codeInvitedA = true;
    }else{
      this.codeInvitedA = false;
    }
  }

  onAddModule(){
    this.add_mod= false;
    this.choose_mod= true; 
  }

  onChoose(serial){
    this.selected_serial = serial;
    this.modal_mod=true;
  }

  onToUpper(e) {
    e.target.value = e.target.value.toUpperCase();
}

lockerAddress(event){
  let auxArray = JSON.parse(this.arrayMarker);

  auxArray.forEach(element => {
    if(element.id_locker == event){
      this.id_locker = event;
      this.locker_name = element.locker_name;
      this.locker_address = element.locker_address;
    }
  });
}

filterLockersList(event){
  const filterValue = (event.target as HTMLInputElement).value;
  this.arrayMarker = this.arrAuxMarker.filter( i => i.locker_address.toLowerCase().indexOf(filterValue) >= 0 );
  this.arrayMarker = JSON.stringify(this.arrayMarker);
}

  onAddSerial(){
    let err_status = false;
    let err_action = false;

    if(!this.regex_serial.test(this.serial_status)){
      document.getElementById("serialStatus").style.border="1px solid red";
      err_status = true;
    }else{
      document.getElementById("serialStatus").style.border="1px solid #E4E4E4";
      err_status = false;
    }

    if(!this.regex_serial.test(this.serial_action)){
      document.getElementById("serialAction").style.border="1px solid red";
      err_action = true;
    }else{
      document.getElementById("serialAction").style.border="1px solid #E4E4E4";
      err_action = false;
    }

    if(!err_status && !err_action){
      this.contMod++;
      this.modal_mod= false;
      this.choose_mod= false;
      this.add_mod= true;
      this.serial_status = null;
      this.serial_action = null;
      this.items.push({'id':this.contMod, type:this.selected_serial});
    }
  }
  
  onDeleteModule(id, index){
    this.items.splice(index, 1)
  }

  onCloseModal(){
    this.modal_mod= false;
    this.choose_mod= false;
    this.add_mod= true;
  }

  onMouseEnter(event, item){
    this.btnDelete = item;
  }
  onMouseLeave(event, item){
    this.btnDelete = null;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  isValidIP(event){
    let id = event.target.id;
    let text = event.target.value;
    
    if(!this.regex_ip.test(text)){
      document.getElementById(id).style.border="1px solid red";
    }else{
      document.getElementById(id).style.border="1px solid #E4E4E4";
    }
      
  }

  onCreateLocker(){
    if(this.locker_name && this.serial && this.company && this.location && this.type_locker && this.privacy_locker && this.code_locker){      
    }else{      
    }
  }
}
