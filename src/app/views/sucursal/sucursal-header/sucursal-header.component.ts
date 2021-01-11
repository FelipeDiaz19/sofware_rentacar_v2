import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SucursalesService } from 'src/app/services/sucursales.service';

@Component({
  selector: 'app-sucursal-header',
  templateUrl: './sucursal-header.component.html',
  styleUrls: ['./sucursal-header.component.css']
})
export class SucursalHeaderComponent implements OnInit {

  form: boolean = false;
  constructor(private router: Router, public _sucursal: SucursalesService) {
    this._sucursal.formOption;
  }

  ngOnInit(): void {

  }

  navegar(URL: string) {
    this._sucursal.formOption = !this._sucursal.formOption;
    this.router.navigate([URL]);
  }

}
