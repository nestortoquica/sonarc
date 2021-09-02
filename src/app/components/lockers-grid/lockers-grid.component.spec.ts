import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockersGridComponent } from './lockers-grid.component';

describe('LockersGridComponent', () => {
  let component: LockersGridComponent;
  let fixture: ComponentFixture<LockersGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockersGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockersGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
