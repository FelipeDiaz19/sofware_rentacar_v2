import { Routes } from "@angular/router";
import { SucursalFormComponent } from "./sucursal-form/sucursal-form.component";
import { SucursalListComponent } from "./sucursal-list/sucursal-list.component";



export const sucursales_routes: Routes = [
    { path: '', component: SucursalListComponent },
    { path: 'sucursalList', component: SucursalListComponent },
    { path: 'sucursalForm/:id', component: SucursalFormComponent },
]