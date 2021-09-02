import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient) { }

  download(url: string) {
    let httpHeaders = new HttpHeaders()
         .set('Accept', "image/webp,*/*");
    return this.http.get(url, {
      headers: httpHeaders,
      responseType: 'blob' as 'json'
    });
  }

}
