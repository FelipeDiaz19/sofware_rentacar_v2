import { Routes } from '@angular/router';
import { TarifasVehiculosFormComponent } from './tarifas-vehiculos/tarifas-vehiculos-form/tarifas-vehiculos-form.component';
import { TarifasAccesoriosFormComponent } from './tarifas-accesorios/tarifas-accesorios-form/tarifas-accesorios-form.component';


export const tarifas_routes: Routes = [
  { path: '', component: TarifasVehiculosFormComponent },
  { path: 'tarifasVehiculos', component: TarifasVehiculosFormComponent },
  { path: 'tarifasAccesorios', component: TarifasAccesoriosFormComponent }
];

