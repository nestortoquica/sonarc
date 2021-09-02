import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayBalanceComponent } from './pay-balance.component';

describe('PayBalanceComponent', () => {
  let component: PayBalanceComponent;
  let fixture: ComponentFixture<PayBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayBalanceComponent ]
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
