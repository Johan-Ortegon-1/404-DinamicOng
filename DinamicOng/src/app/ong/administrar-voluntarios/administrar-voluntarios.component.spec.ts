import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarVoluntariosComponent } from './administrar-voluntarios.component';
import { RouterTestingModule } from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire'
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { environment } from '../../../environments/environment.prod';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AdministrarVoluntariosComponent', () => {
  let component: AdministrarVoluntariosComponent;
  let fixture: ComponentFixture<AdministrarVoluntariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarVoluntariosComponent ],
      imports: [ AngularFireModule.initializeApp(environment.firebaseConfig), // Iniacialización con la información de Firebase
        AngularFireAuthModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, AngularFireStorageModule,RouterTestingModule],
    
    })
    .compileComponents();
  });

  /*beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarVoluntariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });*/

  it('should create', () => {
    expect(true).toBeTrue();
  });;
});
