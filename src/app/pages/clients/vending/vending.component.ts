import { Component, OnInit } from '@angular/core';
import { RetailService } from 'src/app/services/retail.service';

@Component({
  selector: 'app-vending',
  templateUrl: './vending.component.html',
  styleUrls: ['./vending.component.scss']
})
export class VendingComponent implements OnInit {

  constructor(private http: RetailService) { }

  ngOnInit() {
  }

}
