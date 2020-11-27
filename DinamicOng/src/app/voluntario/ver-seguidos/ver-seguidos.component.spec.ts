import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSeguidosComponent } from './ver-seguidos.component';

describe('VerSeguidosComponent', () => {
  let component: VerSeguidosComponent;
  let fixture: ComponentFixture<VerSeguidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerSeguidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerSeguidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
