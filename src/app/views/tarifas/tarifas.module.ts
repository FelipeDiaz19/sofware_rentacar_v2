import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarifasHeaderComponent } from './tarifas-header/tarifas-header.component';
import { TarifasVehiculosFormComponent } from './tarifas-vehiculos/tarifas-vehiculos-form/tarifas-vehiculos-form.component';
import { TarifasVehiculosListComponent } from './tarifas-vehiculos/tarifas-vehiculos-list/tarifas-vehiculos-list.component';
import { TarifasAccesoriosFormComponent } from './tarifas-accesorios/tarifas-accesorios-form/tarifas-accesorios-form.component';
import { TarifasAccesoriosListComponent } from './tarifas-accesorios/tarifas-accesorios-list/tarifas-accesorios-list.component';
import { VehiculosService } from 'src/app/services/vehiculos.service';
import { AccesoriosService } from 'src/app/services/accesorios.service';
import { TarifasVehiculosService } from 'src/app/services/tarifas-vehiculos.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TarifasHeaderComponent,
    TarifasVehiculosFormComponent,
    TarifasVehiculosListComponent,
    TarifasAccesoriosFormComponent,
    TarifasAccesoriosListComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule, AppRoutingModule, AgGridModule.withComponents([]),
  ],
  providers: [
    TarifasVehiculosService, AccesoriosService, VehiculosService
  ]
})
export class TarifasModule { }
