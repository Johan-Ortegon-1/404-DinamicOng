import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarOngComponent } from './navbar-ong.component';

describe('NavbarOngComponent', () => {
  let component: NavbarOngComponent;
  let fixture: ComponentFixture<NavbarOngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarOngComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarOngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
