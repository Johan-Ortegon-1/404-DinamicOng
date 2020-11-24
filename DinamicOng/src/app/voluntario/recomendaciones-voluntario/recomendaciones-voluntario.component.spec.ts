import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendacionesVoluntarioComponent } from './recomendaciones-voluntario.component';

describe('RecomendacionesVoluntarioComponent', () => {
  let component: RecomendacionesVoluntarioComponent;
  let fixture: ComponentFixture<RecomendacionesVoluntarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecomendacionesVoluntarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendacionesVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
