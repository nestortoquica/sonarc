import { async, TestBed } from '@angular/core/testing';
import { PayBalanceComponent } from './pay-balance.component';
describe('PayBalanceComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PayBalanceComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(PayBalanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=pay-balance.component.spec.js.map