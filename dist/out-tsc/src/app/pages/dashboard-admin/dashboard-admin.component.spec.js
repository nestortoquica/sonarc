import { async, TestBed } from '@angular/core/testing';
import { DashboardAdminComponent } from './dashboard-admin.component';
describe('DashboardAdminComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardAdminComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardAdminComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=dashboard-admin.component.spec.js.map