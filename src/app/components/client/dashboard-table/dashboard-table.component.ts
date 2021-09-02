import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Module } from 'src/app/models/locker_model';
import { RetailService } from 'src/app/services/retail.service';
import { ClientGrid } from '../dialogs/client-grid.component';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss']
})

export class DashboardTableComponent implements OnInit {
  
  @Input() data;
  @Input() columns:string;
  @Input() hover
  delivery = [];
  unclaimed = [];
  coords
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  tempData = []
  dataSource
  displayedColumns: string[];
  local;
  locks: []
  lockers: []|any;
  grid
  count_door=1;
  module: Module[] = [];
  status = [];

  constructor(
    private router: Router,
    private component: AppComponent,
    private retailService: RetailService,
    private dialog: MatDialog
    ) { }
  
  ngOnInit() {
    this.local = JSON.parse(localStorage.getItem('data'))
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hover) {
      this.hover?this.coords = JSON.parse(this.hover):null;
      
    } else {
      this.data?this.tempData = JSON.parse(this.data):null;      
      this.tempData.forEach(e => {
        this.delivery.push(e.deliveries);
        this.unclaimed.push(e.unclaimed);
      });
      if (this.data) {
        this.data = JSON.parse(this.data)
      }
      this.displayedColumns= this.columns.split(',')
      this.data?this.dataSource = new MatTableDataSource(this.data):null;
      this.data?this.dataSource.paginator = this.paginator:null;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async seeLocker(locker, i){    
    let month = new Date().getMonth();
    let countIndex = 0;
    let year = new Date().getFullYear();
    let data = {
      language: localStorage.getItem("lenguage"),
      id_company: this.local.data_company.id_company,
      month_actuality: month,
      last_month: month-1,
      year: year,
      token: localStorage.getItem('token')
    }
    let grid = [];
    this.lockers = await this.retailService.getLockersRetail(data);         

    for(countIndex=0; countIndex < this.lockers.length ; countIndex++ ){
      if(this.lockers[countIndex].id_locker == locker.id){        
        break;
      }
    }
    
    this.lockers[countIndex].MODULE.forEach((e, i)=>{
      grid.push(e.template_module)
      
    })

    localStorage.setItem('grid', JSON.stringify(grid))
    this.component.setId(locker.id);
    localStorage.setItem('id_locker', locker.id)
    localStorage.setItem('lat', locker.lat)
    localStorage.setItem('lng', locker.lng)
    localStorage.setItem('address', locker.address)
    localStorage.setItem('locker_name', locker.lockerID)
    this.router.navigateByUrl(`l-retail/locker/${locker.id}`, {skipLocationChange: true})
  }

  async seeGrid(locker, i){
    this.count_door = 1
    let countIndex = 0;
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let data = {
      language: localStorage.getItem("lenguage"),
      id_company: this.local.data_company.id_company,
      month_actuality: month,
      last_month: month-1,
      year: year,
      token: localStorage.getItem('token')
    }
    let grid = [];
    this.lockers = await this.retailService.getLockersRetail(data);
    for(countIndex=0; countIndex < this.lockers.length ; countIndex++ ){
      if(this.lockers[countIndex].id_locker == locker.id){        
        break;
      }
    }
    this.lockers[countIndex].MODULE.forEach((e, i)=>{
      grid.push(e.template_module)
      
    })
    
    localStorage.setItem('grid', JSON.stringify(grid))
    this.module = []
    this.grid = JSON.parse(localStorage.getItem('grid'));
    this.grid.forEach((e,i) => {
      e.forEach((l) => {
        if(l.class!= "SCREEN")
          l.text = this.count_door++;
        else
          l.text = "null";
      })
      this.module.push(
        {id: i+1, locker: e}
      )
    });
    this.getGrid(locker.id)
    
  }


  async getGrid(id){
    let params = {
      language: localStorage.getItem('lenguage').toLowerCase(),
      id_locker: id,
      token: localStorage.getItem('token')
    }
    let lockerGrid:any = await this.retailService.getLockersGrid(params);
    lockerGrid.modulo_status.forEach((e, i) => {
      e.DOOR.forEach(d=>{
        this.status.push(d.name_status)
        this.module.forEach((e) =>{
          e.locker.forEach((l) => {
            if(l.text == d.door_number){
              l.class = d.GRID.class;
            }
          })
        })
      })
    });
    this.dialog.open(ClientGrid,
      {
        width: window.innerHeight<window.innerWidth?'60%':'99%',
        height: window.innerHeight<window.innerWidth?'70%':'35%',
        data: {
          module: this.module,
          status: this.status
        }
      })
  }

}
