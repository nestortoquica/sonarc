import { async, TestBed } from '@angular/core/testing';
import { DashboardClientComponent } from './dashboard-client.component';
describe('DashboardLocatarioComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardClientComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardClientComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=dashboard-locatario.component.spec.js.map