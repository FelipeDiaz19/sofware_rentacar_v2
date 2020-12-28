import { Router } from '@angular/router';
import { Sucursal } from './../../../models/sucursales';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarifas-header',
  templateUrl: './tarifas-header.component.html',
  styleUrls: ['./tarifas-header.component.css']
})
export class TarifasHeaderComponent implements OnInit {

  constructor(private router: Router) {


  }

  ngOnInit(): void {

  }


  navergar(URL: String) {
    this.router.navigate([URL])
  }


}
