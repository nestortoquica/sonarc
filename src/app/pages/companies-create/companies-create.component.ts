import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies-create',
  templateUrl: './companies-create.component.html',
  styleUrls: ['./companies-create.component.scss']
})
export class CompaniesCreateComponent implements OnInit {
  name;
  last_name;
  email;
  company;
  rfc;
  company_name;

  constructor() { }

  ngOnInit() {
  }

}
