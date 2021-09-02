import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartEntregasComponent } from './chart-entregas.component';

describe('ChartEntregasComponent', () => {
  let component: ChartEntregasComponent;
  let fixture: ComponentFixture<ChartEntregasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartEntregasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
