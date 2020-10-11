import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarBusquedaComponent } from './mostrar-busqueda.component';

describe('MostrarBusquedaComponent', () => {
  let component: MostrarBusquedaComponent;
  let fixture: ComponentFixture<MostrarBusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarBusquedaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
