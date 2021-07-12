import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAppointmentFormComponent } from './make-appointment-form.component';

describe('MakeAppointmentFormComponent', () => {
  let component: MakeAppointmentFormComponent;
  let fixture: ComponentFixture<MakeAppointmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeAppointmentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeAppointmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
