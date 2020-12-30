import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Accesorio } from 'src/app/models/accesorios';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { Sucursal } from 'src/app/models/sucursales';
import { AccesoriosService } from 'src/app/services/accesorios.service';
import { AlertHelper } from 'src/app/helpers/alert.helper';

@Component({
  selector: 'app-tarifas-accesorios-form',
  templateUrl: './tarifas-accesorios-form.component.html',
  styleUrls: ['./tarifas-accesorios-form.component.css']
})
export class TarifasAccesoriosFormComponent implements OnInit {

  seleccion: boolean = false;
  accesorio: Accesorio = new Accesorio();
  sucursales: Sucursal[] = [];

  constructor(private sucursalService: SucursalesService, private _accesorio: AccesoriosService, private alert: AlertHelper) { }


  buscarSucursales() {
    this.sucursalService.getSucursales().subscribe(response => {
      this.sucursales = response.data;
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
    // this.alert.loadingAlert();
    this._accesorio.create(this.accesorio).subscribe(response => {
      this.alert.createAlert(response.msg)
      this.accesorio = new Accesorio();
      FORM.reset();
    })

  }

  actualizarAccesorio(FORM: NgForm) {
    if (FORM.invalid) {
      Object.values(FORM.controls).forEach(control => {
        control.markAllAsTouched();
      })
      return;
    }
    //this.alert.loadingAlert()
    this._accesorio.put(FORM.value, this.accesorio.id_accesorio).subscribe(response => {
      this.alert.updateAlert(response.msg);
      this.accesorio = new Accesorio();
      this.seleccion = false;
      FORM.reset();
    })
  }





}
