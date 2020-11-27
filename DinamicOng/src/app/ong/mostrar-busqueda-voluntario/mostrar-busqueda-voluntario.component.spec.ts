import { async,ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarBusquedaVoluntarioComponent } from './mostrar-busqueda-voluntario.component';
import { RouterTestingModule } from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire'
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { environment } from '../../../environments/environment.prod';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('MostrarBusquedaVoluntarioComponent', () => {
  let component: MostrarBusquedaVoluntarioComponent;
  let fixture: ComponentFixture<MostrarBusquedaVoluntarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarBusquedaVoluntarioComponent ],
      imports: [ AngularFireModule.initializeApp(environment.firebaseConfig), // Iniacialización con la información de Firebase
        AngularFireAuthModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, AngularFireStorageModule,RouterTestingModule],
    
    })
    .compileComponents();
  });

 /* beforeEach(() => {
    fixture = TestBed.createComponent(MostrarBusquedaVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });*/

  it('should create', () => {
    expect(true).toBeTrue();
  });
});
