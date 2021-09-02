import { Component, OnInit } from '@angular/core';
import { ServerUserService } from '../../services/server-user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  arrayNotications;
  constructor(private ServerUserService: ServerUserService,) { }

  ngOnInit() {

    this.get_notifications();
  }

  get_notifications(){
    let data = {
      "language" : localStorage.getItem('lenguage'),
      "id_user" : localStorage.getItem("id_user")
    };
    this.ServerUserService.post_log_package_user(data).subscribe( res => {  
      if( res.mensaje_return.ERROR == false ){
        this.arrayNotications = res.result_list[0][1];
      }
    });
    
  }

}
