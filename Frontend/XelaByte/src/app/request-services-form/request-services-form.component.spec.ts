import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestServicesFormComponent } from './request-services-form.component';

describe('RequestServicesFormComponent', () => {
  let component: RequestServicesFormComponent;
  let fixture: ComponentFixture<RequestServicesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestServicesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestServicesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
