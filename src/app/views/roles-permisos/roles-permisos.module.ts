import { FormsModule, } from '@angular/forms';
import { TablaModule } from './../../components/tabla/tabla.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesPermisosHeaderComponent } from './roles-permisos-header/roles-permisos-header.component';
import { RolesContentComponent } from './tab-roles/roles-content/roles-content.component';
import { PermisosContentComponent } from './tab-permisos/permisos-content/permisos-content.component';
import { ModalModule } from 'src/app/components/modal/modal.module';

@NgModule({
  declarations: [RolesPermisosHeaderComponent, RolesContentComponent, PermisosContentComponent],
  imports: [CommonModule, AppRoutingModule, TablaModule, ModalModule, FormsModule]
})
export class RolesPermisosModule { }
