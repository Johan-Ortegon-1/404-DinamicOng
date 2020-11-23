import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuloChatComponent } from './modulo-chat.component';
import { ChatComponent } from '../chat/chat.component';

const routes: Routes = [
  { path: '', component: ModuloChatComponent, children: [
    { path: ':id', component: ChatComponent}
  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloChatRoutingModule { }
