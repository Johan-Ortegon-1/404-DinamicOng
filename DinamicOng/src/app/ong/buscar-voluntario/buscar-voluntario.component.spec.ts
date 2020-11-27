import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarVoluntarioComponent } from './buscar-voluntario.component';

describe('BuscarVoluntarioComponent', () => {
  let component: BuscarVoluntarioComponent;
  let fixture: ComponentFixture<BuscarVoluntarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarVoluntarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
