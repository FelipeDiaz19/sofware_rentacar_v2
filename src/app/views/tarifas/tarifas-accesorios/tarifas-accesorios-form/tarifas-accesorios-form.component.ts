import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Accesorio } from 'src/app/models/accesorios';

@Component({
  selector: 'app-tarifas-accesorios-form',
  templateUrl: './tarifas-accesorios-form.component.html',
  styleUrls: ['./tarifas-accesorios-form.component.css']
})
export class TarifasAccesoriosFormComponent implements OnInit {

  accesorio: Accesorio = new Accesorio();
  id_sucursal: Number
  constructor(private router: ActivatedRoute) {

    this.router.params.subscribe(params => {
      this.id_sucursal = params["id"];
    })


  }

  ngOnInit(): void {
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
    //cacturar tambien la id de la sucursal
    console.log(this.id_sucursal);
    console.log(FORM.value);

  }

}
