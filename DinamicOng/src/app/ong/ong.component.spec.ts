import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngComponent } from './ong.component';
import { RouterTestingModule } from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire'
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { environment } from '../../environments/environment.prod';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('OngComponent', () => {
  let component: OngComponent;
  let fixture: ComponentFixture<OngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngComponent ],
      imports: [ AngularFireModule.initializeApp(environment.firebaseConfig), // Iniacialización con la información de Firebase
        AngularFireAuthModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, AngularFireStorageModule,RouterTestingModule],
    
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTrue();
  });
});
