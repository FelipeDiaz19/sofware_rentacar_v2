import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



//rutas
import { AppRoutingModule } from './app-routing.module';



// servicios
import { AuthService } from './services/auth.service';
import { SucursalesService } from './services/sucursales.service';


// components
import { AppComponent } from './app.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { SidebarsComponent } from './template/sidebars/sidebars.component';
import { HomeComponent } from './views/home/home.component';
import { ItemComponent } from './views/item/item.component';
import { AuthComponent } from './components/auth/auth.component';
import { TarifasHeaderComponent } from './views/tarifas/tarifas-header/tarifas-header.component';
import { TarifasVehiculosFormComponent } from './views/tarifas/tarifas-vehiculos/tarifas-vehiculos-form/tarifas-vehiculos-form.component';
import { TarifasVehiculosListComponent } from './views/tarifas/tarifas-vehiculos/tarifas-vehiculos-list/tarifas-vehiculos-list.component';
import { TarifasAccesoriosFormComponent } from './views/tarifas/tarifas-accesorios/tarifas-accesorios-form/tarifas-accesorios-form.component';
import { TarifasAccesoriosListComponent } from './views/tarifas/tarifas-accesorios/tarifas-accesorios-list/tarifas-accesorios-list.component';







@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarsComponent,
    ItemComponent,
    HomeComponent,
    AuthComponent,
    TarifasHeaderComponent,
    TarifasVehiculosFormComponent,
    TarifasVehiculosListComponent,
    TarifasAccesoriosFormComponent,
    TarifasAccesoriosListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, SucursalesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
