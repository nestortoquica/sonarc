import { async, TestBed } from '@angular/core/testing';
import { ChartEntregasComponent } from './chart-entregas.component';
describe('ChartEntregasComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChartEntregasComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ChartEntregasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=chart-entregas.component.spec.js.map