import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { Sucursal } from 'src/app/models';
import { SucursalesService } from 'src/app/services/sucursales.service';

import { SucursalModalComponent } from '../sucursal-modal/sucursal-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CalendarView } from 'angular-calendar';
@Component({
  selector: 'app-sucursal-list',
  templateUrl: './sucursal-list.component.html',
  styleUrls: ['./sucursal-list.component.css']
})

export class SucursalListComponent implements OnInit {

  sucursales: Sucursal[] = [];
  listThead: string[] = [];

  constructor(private _sucursal: SucursalesService, public dialog:MatDialog) {
    this.listThead = ['Sucursal', 'Region', 'Arriendos totales', 'Arriendos Finalizados',
      'Arriendos Activos', 'Arriendos Anulados', 'fecha de registro', 'Calendario'];

      
  }

  ngOnInit(): void {
    this.cargarSucursal();
    
  }

  cargarSucursal(): void {
    this._sucursal.getAll().subscribe((sucursales: Sucursal[]) => {
      sucursales.map(sucursal => {
        let finalizados = 0;
        let activos = 0;
        let anulados = 0;
        sucursal["arriendos"].forEach(arriendo => {
          if (arriendo.estado_arriendo == "FINALIZADO") {
            finalizados++;
          }
          if (arriendo.estado_arriendo == "ANULADO") {
            anulados++
          }
          if (arriendo.estado_arriendo == "ACTIVO" || arriendo.estado_arriendo == "RECEPCIONADO" ||arriendo.estado_arriendo == "EXTENDIDO" || arriendo.estado_arriendo == "E-CONFIRMADO") {
            activos++
          }
        })
        sucursal["cant_finalizados"] = finalizados;
        sucursal["cant_activos"] = activos;
        sucursal["cant_anulados"] = anulados;
      })
      this.sucursales = sucursales;

    })
  }

  openDialog():void{
    const dialogRef = this.dialog.open(SucursalModalComponent,{});
    dialogRef.afterClosed().subscribe(res =>{
      console.log(res);
    });    
  }  


}
