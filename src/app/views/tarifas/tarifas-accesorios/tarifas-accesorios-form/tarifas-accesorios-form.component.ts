import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Accesorio } from 'src/app/models/accesorios';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { Sucursal } from 'src/app/models/sucursales';

@Component({
  selector: 'app-tarifas-accesorios-form',
  templateUrl: './tarifas-accesorios-form.component.html',
  styleUrls: ['./tarifas-accesorios-form.component.css']
})
export class TarifasAccesoriosFormComponent implements OnInit {


  accesorio: Accesorio = new Accesorio();

  sucursales: Sucursal[] = [];

  constructor(private sucursalService: SucursalesService) {
  }


  buscarSucursales() {
    this.sucursalService.getSucursales().subscribe((sucursales: Sucursal[]) => {
      this.sucursales = sucursales;
    })
  }


  ngOnInit(): void {
    this.buscarSucursales();
    this.accesorio.nombre_accesorio = "";
    this.accesorio.precio_accesorio = 0;
  }

  guardarAccesorio(FORM: NgForm) {
    if (FORM.invalid) {
      Object.values(FORM.controls).forEach(control => {
        control.markAllAsTouched();
      })
      return;
    }
    //enviar al servidor
    console.log(FORM.value);

  }

}
