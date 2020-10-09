import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register.component';
import { RegisterOngComponent } from './register-ong/register-ong.component';
import { RegisterVoluntarioComponent } from './register-voluntario/register-voluntario.component';

const routes: Routes = [
  { path: '', component: RegisterComponent,
    children: [
      { path: 'ong', component: RegisterOngComponent },
    ]
  },
  { path: '', component: RegisterComponent,
    children: [
      { path: 'voluntario', component: RegisterVoluntarioComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
