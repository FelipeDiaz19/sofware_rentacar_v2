import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArriendoOptionComponent } from './arriendo-option/arriendo-option.component';
import { ArriendoFormComponent } from './arriendo-form/arriendo-form.component';
import { ArriendoHeaderComponent } from './arriendo-header/arriendo-header.component';
import { ArriendoService } from 'src/app/services/arriendo.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ArriendoFormComponent, ArriendoOptionComponent, ArriendoHeaderComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
  ],
  providers: [
    ArriendoService, AppRoutingModule
  ]
})
export class ArriendoModule { }
