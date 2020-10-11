import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMiPerfilComponent } from "./VerMiPerfilComponent";

describe('VerMiPerfilComponent', () => {
  let component: VerMiPerfilComponent;
  let fixture: ComponentFixture<VerMiPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerMiPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMiPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
