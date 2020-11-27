import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendacionesOngComponent } from './recomendaciones-ong.component';

describe('RecomendacionesOngComponent', () => {
  let component: RecomendacionesOngComponent;
  let fixture: ComponentFixture<RecomendacionesOngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecomendacionesOngComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendacionesOngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
