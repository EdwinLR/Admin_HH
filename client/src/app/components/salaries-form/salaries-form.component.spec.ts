import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalariesFormComponent } from './salaries-form.component';

describe('SalariesFormComponent', () => {
  let component: SalariesFormComponent;
  let fixture: ComponentFixture<SalariesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalariesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalariesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
