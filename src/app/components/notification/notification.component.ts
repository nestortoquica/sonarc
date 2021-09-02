import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() type: string;
  @Input() message: string;
  @Input() remove = false;
  classNofitication:string;

  constructor() {  
  }

  ngOnInit() {
    
  }

  ngOnChanges(){
    this.stylesForNotification();
  }

  stylesForNotification(){
    if( this.type === "info"){
      this.classNofitication = "styles-info";
    }else if(this.type === "success"){
      this.classNofitication = "styles-success";
    }else if( this.type === "error" ){
      this.classNofitication = "styles-error";
    }else if( this.type === "warning" ){
      this.classNofitication = "styles-warning";
    }
  }

}

