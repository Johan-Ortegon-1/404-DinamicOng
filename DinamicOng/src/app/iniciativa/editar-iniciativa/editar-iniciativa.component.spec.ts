import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarIniciativaComponent } from './editar-iniciativa.component';

describe('EditarIniciativaComponent', () => {
  let component: EditarIniciativaComponent;
  let fixture: ComponentFixture<EditarIniciativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarIniciativaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarIniciativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
