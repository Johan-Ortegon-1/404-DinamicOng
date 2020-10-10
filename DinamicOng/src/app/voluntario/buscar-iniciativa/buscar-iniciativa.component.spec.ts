import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarIniciativaComponent } from './buscar-iniciativa.component';

describe('BuscarIniciativaComponent', () => {
  let component: BuscarIniciativaComponent;
  let fixture: ComponentFixture<BuscarIniciativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarIniciativaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarIniciativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
