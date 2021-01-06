import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { NgSelect2Module } from 'ng-select2';

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
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    NgSelect2Module,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthService, SucursalesService, AccesoriosService, AlertHelper],
  bootstrap: [AppComponent]
})
export class AppModule { }
