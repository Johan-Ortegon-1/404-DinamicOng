import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerIniciativasComponent } from './ver-iniciativas.component';

describe('VerIniciativasComponent', () => {
  let component: VerIniciativasComponent;
  let fixture: ComponentFixture<VerIniciativasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerIniciativasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerIniciativasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
