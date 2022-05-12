import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentbyMonthListComponent } from './studentby-month-list.component';

describe('StudentbyMonthListComponent', () => {
  let component: StudentbyMonthListComponent;
  let fixture: ComponentFixture<StudentbyMonthListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentbyMonthListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentbyMonthListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
