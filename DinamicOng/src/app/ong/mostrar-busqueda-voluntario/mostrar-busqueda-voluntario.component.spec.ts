import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarBusquedaVoluntarioComponent } from './mostrar-busqueda-voluntario.component';

describe('MostrarBusquedaVoluntarioComponent', () => {
  let component: MostrarBusquedaVoluntarioComponent;
  let fixture: ComponentFixture<MostrarBusquedaVoluntarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarBusquedaVoluntarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarBusquedaVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
