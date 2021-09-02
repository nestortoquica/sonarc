import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServerUserService } from '../../services/server-user.service';

@Component({
  selector: 'app-confirm-email',
  template: `Holaaaaa`,
  styles: ['']
})

export class ConfirmEmailComponent implements OnInit {
  validation_code;

  constructor(private _router: Router,
    private route: ActivatedRoute,
    private ServerUserService: ServerUserService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.validation_code = params.code;
    });

    this.ServerUserService.get_validate_email_user(this.validation_code).subscribe( res => {    
      if( res.mensaje_return.ERROR == false ){
        this._router.navigateByUrl("/");
        localStorage.removeItem("emailConfirmation");
      }
    });
  }
  

}
