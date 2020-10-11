import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerIniciativaComponent } from './ver-iniciativa.component';

describe('VerIniciativaComponent', () => {
  let component: VerIniciativaComponent;
  let fixture: ComponentFixture<VerIniciativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerIniciativaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerIniciativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
