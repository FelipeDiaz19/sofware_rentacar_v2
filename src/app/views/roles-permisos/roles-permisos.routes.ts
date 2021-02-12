import { Routes } from '@angular/router';
import { PermisosContentComponent } from './tab-permisos/permisos-content/permisos-content.component';
import { RolesContentComponent } from './tab-roles/roles-content/roles-content.component';


export const rolPermiso_routes: Routes = [
    { path: '', component: RolesContentComponent },
    { path: 'rol', component: RolesContentComponent },
    { path: 'permiso', component: PermisosContentComponent }

]