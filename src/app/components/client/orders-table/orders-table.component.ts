import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker, MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { RetailService } from 'src/app/services/retail.service';
import { ClientSign } from '../dialogs/client-dialog';
import { UpdateEmail } from '../dialogs/update-email';
import { TranslateService } from '@ngx-translate/core';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {

  @Input() data;
  @Input() columns:string;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  date = []
  local
  lockers: any|[]
  dataSource: MatTableDataSource<[]>;
  displayedColumns: string[];
  minDate: Date;
  maxDate: Date;  
  dataSendUpdate;
  ok:string = '';

  constructor(    
    private dialog: MatDialog,
    private retailService: RetailService,
    private router: Router,
    private component: AppComponent,
    private translate: TranslateService
    ) { }

  ngOnInit() {    
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate()+1)
    this.maxDate.setDate(this.maxDate.getDate()+2)    
    this.displayedColumns = this.columns.split(',')   
    this.local = JSON.parse(localStorage.getItem('data'))
  }
  
  ngOnChanges() {
    if (this.data) {
      this.dataSource = new MatTableDataSource(JSON.parse(this.data));  
      

      this.dataSource.filteredData.forEach((d:any) => {
        this.translate.get("table."+d.status.toLowerCase()).subscribe( (text: string) => {
          //console.log('text => ',text);
          d.status_traslate = text
        });
      })    
      this.dataSource.paginator = this.paginator;
    }    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  signatureModal(img){
    this.dialog.open(ClientSign, 
      {
        width: window.innerHeight<window.innerWidth?'55%':'80%',
        height: window.innerHeight<window.innerWidth?'65%':'40%',
        data: {image: img,
        type: 'sign'
      },
        
      });
  }
  pickedModal(img){
    this.dialog.open(ClientSign, 
      {
        width: window.innerHeight<window.innerWidth?'55%':'80%',
        height: window.innerHeight<window.innerWidth?'65%':'40%',
        data: {
          image: img,
          type: 'picked'
        },
        
      });
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

  edit(element:any){    
    this.dialog.open(UpdateEmail, 
      {
        width: window.innerHeight<window.innerWidth?'30%':'50%',
        height: window.innerHeight<window.innerWidth?'35%':'10%',
        data: {
          order           : element.order,
          email           : element.email,
          id_package_code : element.id_package_code,
          inLocker        : element.inLocker
        }
      }).afterClosed().subscribe(()=>{        
        if(localStorage.getItem("update-email-consumer") == "true"){
          localStorage.removeItem("update-email-consumer");
          setTimeout(() => {
            this.redirectTo('l-retail/order');
          }, 1000);
        }
      })
  }

  cancel(){
    this.redirectTo('l-retail/order');
  }

  async update(){      
    let res:any = await this.retailService.updateExpirationDate(this.dataSendUpdate) 
    if( res.mensaje_return.ERROR == true ){
       this.ok = 'err';          
    }else{
       this.ok = 'ok';
    }
    setTimeout(() => {
      this.redirectTo('l-retail/order');
    },3000)
  }

async updateTemp(order, date: Date){
    if (date) {
      let month = date.getMonth().toString().length==1?'0'+(date.getMonth()+1):(date.getMonth()+1)
      let day = date.getDate().toString().length==1?'0'+date.getDate():date.getDate()
      let d = date.getFullYear()+'-'+month+'-'+day
      this.dataSendUpdate = {
        language: localStorage.getItem('lenguage').toString(),
        id_company: this.local.data_company.id_company,
        id_package_code: order.id_package_code,
        date_update: d,
        token: localStorage.getItem('token')
      }
    }
  }


  sortData(data: Sort) {
    // Eso se coloca en la tabla para indicar el campo que se va a ordenar
    //matSort (matSortChange)="sortData($event)"

    // Esto se coloca en los th
    //<th mat-header-cell *matHeaderCellDef class="text-center" mat-sort-header="> {{'table.'+column | translate}}"</th>
    console.log("Antes de ordenar: ", this.dataSource.filteredData);    
    console.log(Object.keys(this.dataSource.filteredData).reduce((a, c) => (a[c] = this.dataSource.filteredData[c], a), {}));
  }

  async seeUser(idUsuerio){    
    this.router.navigateByUrl(`l-retail/user/search/${idUsuerio}`, {skipLocationChange: true})
  }
}
