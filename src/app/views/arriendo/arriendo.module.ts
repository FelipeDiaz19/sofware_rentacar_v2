import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArriendoFormComponent } from './arriendo-form/arriendo-form.component';
import { ArriendoHeaderComponent } from './arriendo-header/arriendo-header.component';
import { ArriendoService } from 'src/app/services/arriendo.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArriendoTipoComponent } from './arriendo-tipo/arriendo-tipo.component';
import { EmpresaRemplazoService } from 'src/app/services/empresa-remplazo.service';
import { ArriendoContactoComponent } from './arriendo-contacto/arriendo-contacto.component';
import { ContactoService } from 'src/app/services/contacto.service';
import { ArriendoClienteComponent } from './arriendo-cliente/arriendo-cliente.component';



@NgModule({
  declarations: [
    ArriendoFormComponent, ArriendoHeaderComponent, ArriendoTipoComponent, ArriendoContactoComponent, ArriendoClienteComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
  ],
  providers: [
    ArriendoService, EmpresaRemplazoService, ContactoService, AppRoutingModule
  ]
})
export class ArriendoModule { }
