import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentbyMonthFormComponent } from './studentby-month-form.component';

describe('StudentbyMonthFormComponent', () => {
  let component: StudentbyMonthFormComponent;
  let fixture: ComponentFixture<StudentbyMonthFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentbyMonthFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentbyMonthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
