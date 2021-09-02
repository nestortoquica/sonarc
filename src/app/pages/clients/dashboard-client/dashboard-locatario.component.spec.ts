import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardClientComponent } from './dashboard-client.component';

describe('DashboardLocatarioComponent', () => {
  let component: DashboardClientComponent;
  let fixture: ComponentFixture<DashboardClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
