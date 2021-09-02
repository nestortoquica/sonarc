import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.scss']
})
export class MsgComponent implements OnInit {
  @Input() type_msg;
  @Input() text_msg;
  msg = false;
  constructor() { }

  ngOnInit() {
    this.msg = this.type_msg=='' ? false : true;
  }

  closeMsg(){
    localStorage.removeItem("type_msg");
    localStorage.removeItem("text_msg");
    this.msg = false;
  }

}
