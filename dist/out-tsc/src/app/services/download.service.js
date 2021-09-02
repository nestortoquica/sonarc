import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
let DownloadService = class DownloadService {
    constructor(http) {
        this.http = http;
    }
    download(url) {
        let httpHeaders = new HttpHeaders()
            .set('Accept', "image/webp,*/*");
        return this.http.get(url, {
            headers: httpHeaders,
            responseType: 'blob'
        });
    }
};
DownloadService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DownloadService);
export { DownloadService };
//# sourceMappingURL=download.service.js.map