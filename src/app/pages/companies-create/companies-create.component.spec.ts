import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesCreateComponent } from './companies-create.component';

describe('CompaniesCreateComponent', () => {
  let component: CompaniesCreateComponent;
  let fixture: ComponentFixture<CompaniesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
