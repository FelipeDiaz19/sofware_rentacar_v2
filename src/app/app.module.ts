import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



//rutas
import { AppRoutingModule } from './app-routing.module';



// servicios



// components
import { AppComponent } from './app.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { SidebarsComponent } from './template/sidebars/sidebars.component';
import { HomeComponent } from './views/home/home.component';
import { TarifasComponent } from './views/tarifas/tarifas.component';
import { ItemComponent } from './views/item/item.component';







@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarsComponent,
    TarifasComponent,
    ItemComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
