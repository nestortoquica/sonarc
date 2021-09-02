import { async, TestBed } from '@angular/core/testing';
import { ChartPaquetesComponent } from './chart-paquetes.component';
describe('ChartPaquetesComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChartPaquetesComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ChartPaquetesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=chart-paquetes.component.spec.js.map