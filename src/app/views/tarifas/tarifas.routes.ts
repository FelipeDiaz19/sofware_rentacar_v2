import { TarifasVehiculosFormComponent } from './tarifas-vehiculos/tarifas-vehiculos-form/tarifas-vehiculos-form.component';
import { TarifasAccesoriosFormComponent } from './tarifas-accesorios/tarifas-accesorios-form/tarifas-accesorios-form.component';
import { Routes } from '@angular/router';


export const tarifas_routes: Routes = [
  /*   { path: '**', pathMatch: 'full', redirectTo: 'tarifasVehiculos' },  */
  { path: 'tarifasVehiculos', component: TarifasVehiculosFormComponent },
  { path: 'tarifasAccesorios', component: TarifasAccesoriosFormComponent }
];

