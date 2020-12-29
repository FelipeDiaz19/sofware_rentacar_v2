import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Accesorio } from 'src/app/models/accesorios';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { Sucursal } from 'src/app/models/sucursales';
import { AccesoriosService } from 'src/app/services/accesorios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarifas-accesorios-form',
  templateUrl: './tarifas-accesorios-form.component.html',
  styleUrls: ['./tarifas-accesorios-form.component.css']
})
export class TarifasAccesoriosFormComponent implements OnInit {

  seleccion: boolean = false;

  accesorio: Accesorio = new Accesorio();
  sucursales: Sucursal[] = [];


  constructor(private sucursalService: SucursalesService, private accesorioService: AccesoriosService) {

  }


  buscarSucursales() {
    this.sucursalService.getSucursales().subscribe((sucursales: Sucursal[]) => {
      this.sucursales = sucursales;
    })
  }


  ngOnInit(): void {
    this.buscarSucursales();
  }

  guardarAccesorio(FORM: NgForm) {
    if (FORM.invalid || this.accesorio.id_accesorio) {
      Object.values(FORM.controls).forEach(control => {
        control.markAllAsTouched();
      })
      return;
    }
    this.accesorio = FORM.value;
    this.loadAlert();
    this.accesorioService.create(this.accesorio).subscribe(response => {
      if (response["success"]) {
        Swal.fire({
          title: "Accesorio registrado!",
          text: `accesorio :${response["data"].nombre_accesorio}`,
          icon: "success"
        });
        this.accesorio = new Accesorio();
        FORM.reset();
      } else {
        Swal.fire({
          title: "Ah ocurrido un error",
          icon: "error"
        })
      }
    })
  }

  actualizarAccesorio(FORM: NgForm) {
    if (FORM.invalid) {
      Object.values(FORM.controls).forEach(control => {
        control.markAllAsTouched();
      })
      return;
    }
    this.loadAlert()
    this.accesorioService.put(FORM.value, this.accesorio.id_accesorio).subscribe(response => {
      console.log(response);
      Swal.fire({
        title: "Accesorio actualizado!",
        text: `accesorio :${FORM.value.nombre_accesorio}`,
        icon: "success"
      });
      this.accesorio = new Accesorio();
      this.seleccion = false;
      FORM.reset();
    })
  }



  loadAlert() {
    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    })
    Swal.showLoading();
  }

}
