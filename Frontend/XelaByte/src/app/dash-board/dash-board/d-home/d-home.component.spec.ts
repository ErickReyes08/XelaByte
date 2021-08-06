import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DHomeComponent } from './d-home.component';

describe('DHomeComponent', () => {
  let component: DHomeComponent;
  let fixture: ComponentFixture<DHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
