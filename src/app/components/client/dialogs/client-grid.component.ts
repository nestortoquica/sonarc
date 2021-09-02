import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";


@Component({
    selector: 'app-client-grid',
    templateUrl: './client-grid.component.html',
    styleUrls: ['./client-grid.component.scss']
})
export class ClientGrid implements OnInit{

    available = 0;
    occupied = 0;
    damaged = 0;
    open = 0;

    constructor(
        public dialogRef: MatDialogRef<ClientGrid>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit(): void {
        this.data.status.forEach(e => {
            e=='CERRADO'?this.available++:
            e=='OCUPADO'?this.occupied++:
            e=='ABIERTO'?this.open++:
            this.damaged++
        });
    }
}