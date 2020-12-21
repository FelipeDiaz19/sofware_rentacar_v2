import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { TarifasComponent } from './views/tarifas/tarifas.component';
import { ItemComponent } from './views/item/item.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: "auth/:id/:token", component: AuthComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'tarifas', component: TarifasComponent, canActivate: [AuthGuard] },
  { path: 'item', component: ItemComponent, canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
