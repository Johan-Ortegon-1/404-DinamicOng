import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloChatComponent } from './modulo-chat.component';

describe('ModuloChatComponent', () => {
  let component: ModuloChatComponent;
  let fixture: ComponentFixture<ModuloChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
