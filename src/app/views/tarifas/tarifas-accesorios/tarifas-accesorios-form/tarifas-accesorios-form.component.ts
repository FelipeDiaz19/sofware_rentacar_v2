import { RequestResponse } from './../../../../models/requestResponse';
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
  formatter = new Intl.NumberFormat('CL');
  seleccion: boolean;
  accesorio: Accesorio = new Accesorio();
  sucursales: Sucursal[] = [];


  constructor(private sucursalService: SucursalesService, private accesorioService: AccesoriosService, private alert: AlertHelper) { }


  buscarSucursales(): void {
    this.sucursalService.getAll().subscribe((data: Sucursal[]) => {
      this.sucursales = data;
    });
  }


  ngOnInit(): void {
    this.buscarSucursales();
  }

  guardarAccesorio(FORM: NgForm): void {
    if (FORM.invalid || this.accesorio.id_accesorio) {
      Object.values(FORM.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }
    this.accesorio = FORM.value;
    this.alert.loadingAlert();
    this.accesorioService.create(this.accesorio).subscribe((response: RequestResponse) => {
      this.alert.createAlert(response.msg);
      this.accesorio = new Accesorio();
      FORM.reset();
    });

  }

  actualizarAccesorio(FORM: NgForm): void {
    if (FORM.invalid) {
      Object.values(FORM.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }
    this.alert.loadingAlert();
    this.accesorioService.put(FORM.value, this.accesorio.id_accesorio).subscribe((response: RequestResponse) => {
      this.alert.updateAlert(response.msg);
      this.accesorio = new Accesorio();
      this.seleccion = false;
      FORM.reset();
    });
  }

  calcularIva(neto: number = 0): string {
    return '$ ' + this.formatter.format(neto * 0.19);
  }
  calcularBruto(neto: number = 0): string {
    return '$ ' + this.formatter.format(Number(neto) + Number(neto * 0.19));
  }




}
