import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AgGridModule } from 'ag-grid-angular';

//rutas
import { AppRoutingModule } from './app-routing.module';

//helpers
import { AuthInterceptor } from './helpers/auth.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AlertHelper } from './helpers/alert.helper';

// servicios
import { AuthService } from './services/auth.service';
import { SucursalesService } from './services/sucursales.service';
import { AccesoriosService } from './services/accesorios.service';
import { TarifasVehiculosService } from './services/tarifas-vehiculos.service';
import { VehiculosService } from './services/vehiculos.service';
import { RegionesService } from './services/regiones.service';


// components
import { AppComponent } from './app.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { SidebarsComponent } from './template/sidebars/sidebars.component';
import { HomeComponent } from './views/home/home.component';
import { AuthComponent } from './components/auth.component';


import { TarifasHeaderComponent } from './views/tarifas/tarifas-header/tarifas-header.component';
import { TarifasVehiculosFormComponent } from './views/tarifas/tarifas-vehiculos/tarifas-vehiculos-form/tarifas-vehiculos-form.component';
import { TarifasVehiculosListComponent } from './views/tarifas/tarifas-vehiculos/tarifas-vehiculos-list/tarifas-vehiculos-list.component';
import { TarifasAccesoriosFormComponent } from './views/tarifas/tarifas-accesorios/tarifas-accesorios-form/tarifas-accesorios-form.component';
import { TarifasAccesoriosListComponent } from './views/tarifas/tarifas-accesorios/tarifas-accesorios-list/tarifas-accesorios-list.component';



import { ArriendoHeaderComponent } from './views/arriendo/arriendo-header/arriendo-header.component';


import { SucursalHeaderComponent } from './views/sucursal/sucursal-header/sucursal-header.component';
import { SucursalListComponent } from './views/sucursal/sucursal-list/sucursal-list.component';
import { SucursalFormComponent } from './views/sucursal/sucursal-form/sucursal-form.component';







@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarsComponent,
    HomeComponent,
    AuthComponent,
    TarifasHeaderComponent,
    TarifasVehiculosFormComponent,
    TarifasVehiculosListComponent,
    TarifasAccesoriosFormComponent,
    TarifasAccesoriosListComponent,
    ArriendoHeaderComponent,
    SucursalHeaderComponent,
    SucursalListComponent,
    SucursalFormComponent,
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthService, SucursalesService, TarifasVehiculosService, VehiculosService, RegionesService, AccesoriosService, AlertHelper],
  bootstrap: [AppComponent]
})
export class AppModule { }
