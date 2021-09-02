import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentDate;
  year;
  constructor() { }

  ngOnInit() {
    this.currentDate = new Date();
    this.year = this.currentDate.getFullYear();
  }

}
