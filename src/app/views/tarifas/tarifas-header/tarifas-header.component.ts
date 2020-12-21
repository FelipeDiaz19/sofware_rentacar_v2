import { Router } from '@angular/router';
import { Sucursal } from './../../../models/sucursales';
import { SucursalesService } from './../../../services/sucursales.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-tarifas-header',
  templateUrl: './tarifas-header.component.html',
  styleUrls: ['./tarifas-header.component.css']
})
export class TarifasHeaderComponent implements OnInit {

  form: FormGroup;
  sucursales: Sucursal[] = [];
  id_sucursal: number = 0;

  constructor(private sucursalService: SucursalesService, private formBuilder: FormBuilder, private router: Router) {


  }

  ngOnInit(): void {
    this.buscarSucursales();
    this.form = this.formBuilder.group({
      sucursal: ['']
    })
  }

  buscarSucursales() {
    this.sucursalService.getSucursales().subscribe((sucursales: Sucursal[]) => {
      this.sucursales = sucursales;
    })
  }

  seleccionarSucursal() {
    this.id_sucursal = this.form.value.sucursal;
  }

  navergar(ID: Number, URL: String) {
    this.router.navigate([URL, ID])
  }


}
