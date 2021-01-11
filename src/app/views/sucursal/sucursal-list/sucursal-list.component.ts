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

  constructor(private _sucursal: SucursalesService) {

  }

  ngOnInit(): void {
    this.cargarSucursal();
  }

  cargarSucursal() {
    this._sucursal.getAll().subscribe((sucursales: Sucursal[]) => {
      this.sucursales = sucursales;
    })
  }
}
