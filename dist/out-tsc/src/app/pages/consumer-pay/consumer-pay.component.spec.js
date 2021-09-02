import { async, TestBed } from '@angular/core/testing';
import { ConsumerPayComponent } from './consumer-pay.component';
describe('ConsumerPayComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConsumerPayComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ConsumerPayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=consumer-pay.component.spec.js.map