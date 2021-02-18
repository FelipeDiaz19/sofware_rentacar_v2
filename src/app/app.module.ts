import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


// rutas
import { AppRoutingModule } from './app-routing.module';

// helpers
import { AuthInterceptor } from './helpers/auth.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AlertHelper } from './helpers/alert.helper';

// servicios
import { AuthService } from './services/auth.service';

// components
import { AppComponent } from './app.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { SidebarsComponent } from './template/sidebars/sidebars.component';
import { HomeComponent } from './views/home/home.component';
import { AuthComponent } from './components/auth.component';

// modules
import { ArriendoModule } from './views/arriendo/arriendo.module';
import { TarifasModule } from './views/tarifas/tarifas.module';
import { SucursalModule } from './views/sucursal/sucursal.module';
import { RolesPermisosModule } from './views/roles-permisos/roles-permisos.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarsComponent,
    HomeComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ArriendoModule,
    TarifasModule,
    SucursalModule,
    RolesPermisosModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthService, AlertHelper],
  bootstrap: [AppComponent]
})
export class AppModule { }
