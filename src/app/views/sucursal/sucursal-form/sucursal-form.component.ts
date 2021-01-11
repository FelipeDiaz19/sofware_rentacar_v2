import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertHelper } from 'src/app/helpers/alert.helper';
import { Region, RequestResponse, Sucursal } from 'src/app/models';
import { RegionesService } from 'src/app/services/regiones.service';
import { SucursalesService } from 'src/app/services/sucursales.service';

@Component({
  selector: 'app-sucursal-form',
  templateUrl: './sucursal-form.component.html',
  styleUrls: ['./sucursal-form.component.css']
})
export class SucursalFormComponent implements OnInit {
  form: FormGroup;
  sucursal = new Sucursal();
  regiones: Region[] = [];

  constructor(private fb: FormBuilder, private _region: RegionesService, private _sucursal: SucursalesService, private _alert: AlertHelper, private router: Router) { }

  ngOnInit(): void {
    this.generarFormulario();
    this.cargarRegiones();
  }

  validarCampos(nombre: string): boolean {
    return this.form.get(nombre).invalid && this.form.get(nombre).touched;
  }

  cargarRegiones() {
    this._region.getAll().subscribe((data: Region[]) => {
      this.regiones = data;
    })
  }


  generarFormulario(): void {
    this.form = this.fb.group({
      nombre_sucursal: ['', Validators.required],
      id_region: ['', Validators.required]
    })
  }

  guardar() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }
    this.sucursal = this.form.value;
    this._alert.loadingAlert();
    this._sucursal.create(this.sucursal).subscribe((response: RequestResponse) => {
      this._alert.createAlert(response.msg)
      this.sucursal = new Sucursal();
      this._sucursal.formOption = !this._sucursal.formOption;
      this.router.navigate(["sucursales/sucursalList"]);
    })

  }

}
