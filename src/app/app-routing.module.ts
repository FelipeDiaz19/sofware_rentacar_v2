import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { TarifasComponent } from './views/tarifas/tarifas.component';
import { ItemComponent } from './views/item/item.component';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  { path: "auth/:id/:token", component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tarifas', component: TarifasComponent },
  { path: 'item', component: ItemComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
