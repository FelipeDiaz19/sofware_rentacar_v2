import { ArriendoHeaderComponent } from './views/arriendo/arriendo-header/arriendo-header.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { TarifasHeaderComponent } from './views/tarifas/tarifas-header/tarifas-header.component';
import { tarifas_routes } from './views/tarifas/tarifas.routes';
import { AuthComponent } from './components/auth.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: "auth/:token", component: AuthComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'tarifas', component: TarifasHeaderComponent, canActivate: [AuthGuard], children: tarifas_routes },
  { path: 'arriendos', component: ArriendoHeaderComponent, canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
