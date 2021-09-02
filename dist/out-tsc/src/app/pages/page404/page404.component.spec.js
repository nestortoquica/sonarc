import { async, TestBed } from '@angular/core/testing';
import { Page404Component } from './page404.component';
describe('Page404Component', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [Page404Component]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(Page404Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=page404.component.spec.js.map