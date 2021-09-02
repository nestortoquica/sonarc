import { async, TestBed } from '@angular/core/testing';
import { DashboardLocatarioComponent } from './dashboard-locatario.component';
describe('DashboardLocatarioComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardLocatarioComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardLocatarioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=dashboard-locatario.component.spec.js.map