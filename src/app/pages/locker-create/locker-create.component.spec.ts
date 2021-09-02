import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockerCreateComponent } from './locker-create.component';

describe('LockerCreateComponent', () => {
  let component: LockerCreateComponent;
  let fixture: ComponentFixture<LockerCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockerCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
