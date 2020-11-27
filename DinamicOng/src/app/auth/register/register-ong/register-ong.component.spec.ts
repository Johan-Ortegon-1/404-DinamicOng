import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOngComponent } from './register-ong.component';

describe('RegisterOngComponent', () => {
  let component: RegisterOngComponent;
  let fixture: ComponentFixture<RegisterOngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterOngComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterOngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
