import { async, TestBed } from '@angular/core/testing';
import { GoogleMapsComponent } from './google-maps.component';
describe('GoogleMapsComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GoogleMapsComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(GoogleMapsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=google-maps.component.spec.js.map