import { Platform } from '@angular/cdk/platform';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { RetailService } from 'src/app/services/retail.service';
import { ConfirmDelete } from '../dialogs/confirm-delete';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})
export class ClientTableComponent implements OnInit {

  @Input() data;
  @Input() search;
  @Input() columns:string;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource: MatTableDataSource<[]>;
  displayedColumns: string[];
  mobile = false;
  list;

  constructor(
    private platform: Platform,
    private router: Router,
    private retailService: RetailService,
    private dialog: MatDialog
    ) {  }
    

  ngOnInit() {    
    if (this.platform.ANDROID || this.platform.IOS) {
      this.mobile = true
    } else this.mobile = false
    // this.displayedColumns= this.columns.split(',')
    // this.dataSource = new MatTableDataSource(JSON.parse(this.data));
    // this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this.data) {
      this.list = JSON.parse(this.data)
      this.displayedColumns= this.columns.split(',')
      this.dataSource = new MatTableDataSource(JSON.parse(this.data))
      this.dataSource.paginator = this.paginator;
    }

    if(this.search){  
      this.searchID(this.search)
    }
  }
  
  searchID(value){
     if(this.dataSource){
      const filterValue = value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
     }
  }

  applyFilter(event: Event) {
    if(this.dataSource.filter){
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();  
    }
  }

  edit(element: User){
    //console.log('element => ',JSON.stringify(element));
    // todo: Solo se enviará el id y en la siguiente pagina se recoge el elemento haciendo petición a base de datos
    // this.router.navigate(['l-retail/user/edit/'+JSON.stringify(element), [true]])
    localStorage.setItem("update_user", JSON.stringify(element));
    this.router.navigate([`l-retail/user/edit`])
  }

  create(){
    this.router.navigateByUrl('/l-retail/user/create')
  }

  deleteUser(e){       
    this.dialog.open(ConfirmDelete, {
      data: {
        id: e.id,
        type_user : e.userType
      },
    }).afterClosed().subscribe(()=>{
      if (localStorage.getItem('deleted')) {
        this.list = this.list.filter((l: User)=> l.id != e.id);      
        this.dataSource = new MatTableDataSource(this.list);
      }else{

      }
      localStorage.removeItem('deleted')
    })    
  }
}

