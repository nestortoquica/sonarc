import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockerClientDetailComponent } from './locker-client-detail.component';

describe('LockerDetailComponent', () => {
  let component: LockerClientDetailComponent;
  let fixture: ComponentFixture<LockerClientDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockerClientDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockerClientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
