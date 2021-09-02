import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLocatarioComponent } from './dashboard-locatario.component';

describe('DashboardLocatarioComponent', () => {
  let component: DashboardLocatarioComponent;
  let fixture: ComponentFixture<DashboardLocatarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardLocatarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLocatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
