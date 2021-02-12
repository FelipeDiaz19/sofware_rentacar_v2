import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesPermisosHeaderComponent } from './roles-permisos-header/roles-permisos-header.component';
import { RolesContentComponent } from './tab-roles/roles-content/roles-content.component';
import { PermisosContentComponent } from './tab-permisos/permisos-content/permisos-content.component';
import { TablaComponent } from 'src/app/components/tabla/tabla.component';


@NgModule({
  declarations: [RolesPermisosHeaderComponent, RolesContentComponent, PermisosContentComponent, TablaComponent],
  imports: [
    CommonModule, AppRoutingModule,
  ]
})
export class RolesPermisosModule { }
