import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockersMapComponent } from './lockers-map.component';

describe('LockersMapComponent', () => {
  let component: LockersMapComponent;
  let fixture: ComponentFixture<LockersMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockersMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockersMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
