import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { DownloadService } from "src/app/services/download.service";
@Component({
    selector: 'app-client-sign',
    templateUrl: './client-sign.html'
})
export class ClientSign implements OnInit{
    
    fileUrl
    downloadFile
    
    
    constructor(
        public dialogRef: MatDialogRef<ClientSign>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private downloadService: DownloadService,
        private sanitizer: DomSanitizer
        ){}
        
        ngOnInit(){                 
        
            // this.downloadFile = this.data.image.split('https://').join('')
            const blob = new Blob([this.data.image], {type: 'img/png'})
            this.downloadFile = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob))
        }
        // todo: Aún no encontramos una forma de descargar la imágen de manera óptima
        // download(){
        //     console.log(this.data.image);
        //     this.downloadService.download(this.data.image).subscribe(blob=> {
        //         const a = document.createElement('a');
        //         const objectUrl = URL.createObjectURL(blob);
        //         a.href = objectUrl;
        //         a.download = this.data.type+'.png';
        //         a.click();
        //         URL.revokeObjectURL(objectUrl);
        //     })
        // }

}