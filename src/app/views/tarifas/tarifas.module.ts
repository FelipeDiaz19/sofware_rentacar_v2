import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarifasHeaderComponent } from './tarifas-header/tarifas-header.component';
import { TarifasVehiculosFormComponent } from './tarifas-vehiculos/tarifas-vehiculos-form/tarifas-vehiculos-form.component';
import { TarifasVehiculosListComponent } from './tarifas-vehiculos/tarifas-vehiculos-list/tarifas-vehiculos-list.component';
import { TarifasAccesoriosFormComponent } from './tarifas-accesorios/tarifas-accesorios-form/tarifas-accesorios-form.component';
import { TarifasAccesoriosListComponent } from './tarifas-accesorios/tarifas-accesorios-list/tarifas-accesorios-list.component';
import { TarifasEmpresaReemplazoFormComponent } from './tarifas-empresaReemplazo/tarifas-empresa-reemplazo-form/tarifas-empresa-reemplazo-form.component';
import { VehiculosService } from 'src/app/services/vehiculos.service';
import { AccesoriosService } from 'src/app/services/accesorios.service';
import { TarifasEmpresasReemplazoService } from 'src/app/services/tarifas-empresasReemplazo.service';
import { TarifasVehiculosService } from 'src/app/services/tarifas-vehiculos.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TarifasEmpresaReemplazoListmComponent } from './tarifas-empresaReemplazo/tarifas-empresa-reemplazo-listm/tarifas-empresa-reemplazo-listm.component';
import { TarifasEmpresasReemplazoFormUpdateComponent } from './tarifas-empresaReemplazo/tarifas-empresas-reemplazo-form-update/tarifas-empresas-reemplazo-form-update.component';
import { DataTablesModule } from "angular-datatables";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    TarifasHeaderComponent,
    TarifasVehiculosFormComponent,
    TarifasVehiculosListComponent,
    TarifasAccesoriosFormComponent,
    TarifasAccesoriosListComponent,
    TarifasEmpresaReemplazoFormComponent,
    TarifasEmpresaReemplazoListmComponent,
    TarifasEmpresasReemplazoFormUpdateComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    CommonModule, AppRoutingModule, AgGridModule.withComponents([])
  ],
  providers: [
    TarifasVehiculosService, AccesoriosService, VehiculosService, TarifasEmpresasReemplazoService
  ]
})
export class TarifasModule { }
