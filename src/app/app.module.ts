import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';



//rutas
import { AppRoutingModule } from './app-routing.module';



// servicios
import { AuthService } from './services/auth.service';



// components
import { AppComponent } from './app.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { SidebarsComponent } from './template/sidebars/sidebars.component';
import { HomeComponent } from './views/home/home.component';
import { TarifasComponent } from './views/tarifas/tarifas.component';
import { ItemComponent } from './views/item/item.component';
import { AuthComponent } from './components/auth/auth.component';







@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarsComponent,
    TarifasComponent,
    ItemComponent,
    HomeComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
