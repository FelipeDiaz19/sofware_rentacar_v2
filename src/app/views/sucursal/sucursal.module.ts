import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SucursalHeaderComponent } from './sucursal-header/sucursal-header.component';
import { SucursalListComponent } from './sucursal-list/sucursal-list.component';
import { SucursalFormComponent } from './sucursal-form/sucursal-form.component';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { RegionesService } from 'src/app/services/regiones.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SucursalHeaderComponent,
    SucursalListComponent,
    SucursalFormComponent,
  ],
  imports: [
    CommonModule, AppRoutingModule, FormsModule, ReactiveFormsModule,
  ],
  providers: [
    SucursalesService, RegionesService
  ]
})
export class SucursalModule { }
