import { Component, OnInit, } from '@angular/core';
import { Sucursal } from 'src/app/models';
import { SucursalesService } from 'src/app/services/sucursales.service';

@Component({
  selector: 'app-sucursal-list',
  templateUrl: './sucursal-list.component.html',
  styleUrls: ['./sucursal-list.component.css']
})
export class SucursalListComponent implements OnInit {

  sucursales: Sucursal[] = [];
  dtoSucursal: any = [];

  constructor(private _sucursal: SucursalesService) {

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
          if (arriendo.estado_arriendo == "ACTIVO") {
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




}
