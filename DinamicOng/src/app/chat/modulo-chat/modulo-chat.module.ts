import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuloChatRoutingModule } from './modulo-chat-routing.module';
import { ModuloChatComponent } from './modulo-chat.component';
import { ConversacionesComponent } from '../conversaciones/conversaciones.component';
import { ChatComponent } from '../chat/chat.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ModuloChatComponent,
    ConversacionesComponent,
    ChatComponent],
  imports: [
    CommonModule,
    ModuloChatRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class ModuloChatModule { }
