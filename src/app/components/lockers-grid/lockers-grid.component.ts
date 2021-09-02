import { Component, OnInit } from '@angular/core';
import { ServerUserService } from '../../services/server-user.service';

export interface grid_locker {
  class: string;
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-lockers-grid',
  templateUrl: './lockers-grid.component.html',
  styleUrls: ['./lockers-grid.component.scss']
})
export class LockersGridComponent implements OnInit {
  arrayNodeLocker:any = [];

  data;
  res;
  tt_open = 0;
  tt_occupied = 0;
  tt_available = 0;
  tt_damaged = 0;
  id_locker:number = this.ServerUserService.getIdLocker();
  modlule:number;

  constructor(private ServerUserService: ServerUserService) {}

  ngOnInit() {
    this.data = {
      "language":localStorage.getItem('lenguage'),
      "id_locker": this.id_locker?this.id_locker:2,
      "crypto_validate" : "0"
    };

    const dataGrid = (data) => {
      this.ServerUserService.get_query_door_locker_grid( this.data ).subscribe( res => {
        this.tt_open = 0;
        this.tt_occupied = 0;
        this.tt_available = 0;
        this.tt_damaged = 0;
       // this.data.crypto_validate = this.res.crypto_validate;
        this.res = res;
        var item=0;
        var count_item = 0;
        var total_array = 0;
        var cols;
        this.modlule = 0;

        this.data.crypto_validate = JSON.stringify(this.res.crypto_validate);
        this.res.modulo_status.forEach( modules => {
          total_array = 0;
          count_item = 0;
          cols = 0;

          modules.DOOR.forEach( door => {
            item += door.id_dimention;

            if(total_array == 13 ){
              count_item = 0;
              cols = (cols == 0 ) ? 2 : 0;
            }
            if(this.arrayNodeLocker[this.modlule][cols][count_item].class == "SCREEN"){
              ++count_item;
            }

            this.arrayNodeLocker[this.modlule][cols][count_item].class = door.GRID.class;
            total_array = this.arrayNodeLocker[this.modlule][cols][count_item].rows + total_array;

            //totales
            if(door.GRID.class == "LOCKER_ABIERTO"){ this.tt_open++;}
            if(door.GRID.class == "LOCKER_OCUPADO"){ this.tt_occupied++;}
            if(door.GRID.class == "LOCKER_CERRADO"){ this.tt_available++;}
            if(door.GRID.class == "LOCKER_FALLO"){ this.tt_damaged++;}
            count_item++;
          });
          this.modlule++;
        }); 
        
        if(document.location.href.split('/')[5] && document.location.href.split('/')[4] === "locker")
          dataGrid(this.data);
      });
    };

    this.ServerUserService.get_query_template_locker_module( this.data ).subscribe( res => {
      this.arrayNodeLocker = res.tamplate;
      dataGrid(this.data);
   });
  }
}
