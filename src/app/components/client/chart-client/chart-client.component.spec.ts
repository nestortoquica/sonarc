import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartClientComponent } from './chart-client.component';

describe('ChartSplineComponent', () => {
  let component: ChartClientComponent;
  let fixture: ComponentFixture<ChartClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
