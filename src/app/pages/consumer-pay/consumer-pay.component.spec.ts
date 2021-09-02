import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerPayComponent } from './consumer-pay.component';

describe('ConsumerPayComponent', () => {
  let component: ConsumerPayComponent;
  let fixture: ComponentFixture<ConsumerPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerPayComponent ]
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
