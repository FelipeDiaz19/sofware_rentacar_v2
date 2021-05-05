import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SucursalHeaderComponent } from './sucursal-header/sucursal-header.component';
import { SucursalListComponent } from './sucursal-list/sucursal-list.component';
import { SucursalFormComponent } from './sucursal-form/sucursal-form.component';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { RegionesService } from 'src/app/services/regiones.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablaModule } from 'src/app/components/tabla/tabla.module';
import { SucursalModalComponent } from './sucursal-modal/sucursal-modal.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@NgModule({
  declarations: [
    SucursalHeaderComponent,
    SucursalListComponent,
    SucursalFormComponent,
    SucursalModalComponent,
  ],

  imports: [
    CommonModule, AppRoutingModule, FormsModule, ReactiveFormsModule, TablaModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],

  providers: [
    SucursalesService, RegionesService,
  ],
  exports: [
    SucursalModalComponent,
  ]
})
export class SucursalModule { }
