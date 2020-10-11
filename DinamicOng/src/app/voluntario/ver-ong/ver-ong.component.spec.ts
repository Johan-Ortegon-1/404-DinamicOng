import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerOngComponent } from './ver-ong.component';

describe('VerOngComponent', () => {
  let component: VerOngComponent;
  let fixture: ComponentFixture<VerOngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerOngComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerOngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
