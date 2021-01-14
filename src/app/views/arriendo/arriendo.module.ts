import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArriendoFormComponent } from './arriendo-form/arriendo-form.component';
import { ArriendoHeaderComponent } from './arriendo-header/arriendo-header.component';
import { ArriendoService } from 'src/app/services/arriendo.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArriendoTipoComponent } from './arriendo-tipo/arriendo-tipo.component';



@NgModule({
  declarations: [
    ArriendoFormComponent, ArriendoHeaderComponent, ArriendoTipoComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
  ],
  providers: [
    ArriendoService, AppRoutingModule
  ]
})
export class ArriendoModule { }
