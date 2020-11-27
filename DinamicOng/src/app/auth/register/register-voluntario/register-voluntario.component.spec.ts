import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVoluntarioComponent } from './register-voluntario.component';

describe('RegisterVoluntarioComponent', () => {
  let component: RegisterVoluntarioComponent;
  let fixture: ComponentFixture<RegisterVoluntarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterVoluntarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
