import { TestBed } from '@angular/core/testing';
import { ServerUserService } from './server-user.service';
describe('ServerUserService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(ServerUserService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=server-user.service.spec.js.map