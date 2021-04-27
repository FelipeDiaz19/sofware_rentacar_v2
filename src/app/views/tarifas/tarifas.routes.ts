import { Routes } from '@angular/router';
import { TarifasVehiculosFormComponent } from './tarifas-vehiculos/tarifas-vehiculos-form/tarifas-vehiculos-form.component';
import { TarifasAccesoriosFormComponent } from './tarifas-accesorios/tarifas-accesorios-form/tarifas-accesorios-form.component';
import { TarifasEmpresaReemplazoFormComponent } from './tarifas-empresaReemplazo/tarifas-empresa-reemplazo-form/tarifas-empresa-reemplazo-form.component'
import { TarifasEmpresasReemplazoFormUpdateComponent } from './tarifas-empresaReemplazo/tarifas-empresas-reemplazo-form-update/tarifas-empresas-reemplazo-form-update.component';

export const tarifas_routes: Routes = [
  { path: '', component: TarifasVehiculosFormComponent },
  { path: 'tarifasVehiculos', component: TarifasVehiculosFormComponent },
  { path: 'tarifasAccesorios', component: TarifasAccesoriosFormComponent },
  { path: 'tarifasEmpresasReemplazo', component: TarifasEmpresaReemplazoFormComponent },
  { path: 'tarifasEmpresasReemplazoUpdate', component: TarifasEmpresasReemplazoFormUpdateComponent }
];

