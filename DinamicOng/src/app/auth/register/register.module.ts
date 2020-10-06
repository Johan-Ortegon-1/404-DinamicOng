import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { RegisterOngComponent } from './register-ong/register-ong.component';
import { NavbarRegisterComponent } from './shared/navbar-register/navbar-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [RegisterComponent, RegisterOngComponent, NavbarRegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatIconModule
  ]
})
export class RegisterModule { }
