import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerVoluntarioComponent } from './ver-voluntario.component';

describe('VerVoluntarioComponent', () => {
  let component: VerVoluntarioComponent;
  let fixture: ComponentFixture<VerVoluntarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerVoluntarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
