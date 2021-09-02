import { __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ConfirmDelete } from '../dialogs/confirm-delete';
let ClientTableComponent = class ClientTableComponent {
    constructor(platform, router, retailService, dialog) {
        this.platform = platform;
        this.router = router;
        this.retailService = retailService;
        this.dialog = dialog;
        this.mobile = false;
    }
    ngOnInit() {
        if (this.platform.ANDROID || this.platform.IOS) {
            this.mobile = true;
        }
        else
            this.mobile = false;
        // this.displayedColumns= this.columns.split(',')
        // this.dataSource = new MatTableDataSource(JSON.parse(this.data));
        // this.dataSource.paginator = this.paginator;
    }
    ngOnChanges() {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        if (this.data) {
            this.list = JSON.parse(this.data);
            this.displayedColumns = this.columns.split(',');
            this.dataSource = new MatTableDataSource(JSON.parse(this.data));
            this.dataSource.paginator = this.paginator;
        }
    }
    applyFilter(event) {
        const filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    edit(element) {
        // todo: Solo se enviará el id y en la siguiente pagina se recoge el elemento haciendo petición a base de datos
        // this.router.navigate(['l-retail/user/edit/'+JSON.stringify(element), [true]])
        this.router.navigate([`l-retail/user/${JSON.stringify(element)}/edit`]);
    }
    create() {
        this.router.navigateByUrl('/l-retail/user/create');
    }
    deleteUser(id) {
        this.dialog.open(ConfirmDelete, {
            data: id,
        }).afterClosed().subscribe(() => {
            if (localStorage.getItem('deleted')) {
                this.list = this.list.filter((l) => l.id != id);
                this.dataSource = new MatTableDataSource(this.list);
                localStorage.removeItem('deleted');
            }
        });
    }
};
__decorate([
    Input()
], ClientTableComponent.prototype, "data", void 0);
__decorate([
    Input()
], ClientTableComponent.prototype, "columns", void 0);
__decorate([
    ViewChild(MatPaginator, { static: true })
], ClientTableComponent.prototype, "paginator", void 0);
ClientTableComponent = __decorate([
    Component({
        selector: 'app-client-table',
        templateUrl: './client-table.component.html',
        styleUrls: ['./client-table.component.scss']
    })
], ClientTableComponent);
export { ClientTableComponent };
//# sourceMappingURL=client-table.component.js.map