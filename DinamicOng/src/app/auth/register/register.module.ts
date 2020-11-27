import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { RegisterOngComponent } from './register-ong/register-ong.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { RegisterVoluntarioComponent } from './register-voluntario/register-voluntario.component';
import { RegisterHomeComponent } from './register-home/register-home.component';
import { NavbarRegisterComponent } from 'src/app/shared/navbar-register/navbar-register.component';


@NgModule({
  declarations: [RegisterComponent, RegisterOngComponent, NavbarRegisterComponent, RegisterVoluntarioComponent, RegisterHomeComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatIconModule
  ]
})
export class RegisterModule { }
