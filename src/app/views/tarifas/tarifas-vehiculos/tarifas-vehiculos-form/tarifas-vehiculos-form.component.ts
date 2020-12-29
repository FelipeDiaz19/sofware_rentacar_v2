import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarifas-vehiculos-form',
  templateUrl: './tarifas-vehiculos-form.component.html',
  styleUrls: ['./tarifas-vehiculos-form.component.css']
})
export class TarifasVehiculosFormComponent implements OnInit {


  form: FormGroup;
  vehiculos: any[] = [];

  constructor(private fb: FormBuilder) {
    this.generarFormulario();
  }

  ngOnInit(): void {
  }



  validarCampos(nombre: string): boolean {
    return this.form.get(nombre) && this.form.get(nombre).touched;
  }

  generarFormulario(): void {
    this.form = this.fb.group({
      vehiculo: ['', Validators.required],
      valor_diario_vehiculo: ['', Validators.required],
      valor_semanal_vehiculo: ['', Validators.required],
      valor_quincenal_vehiculo: ['', Validators.required],
      valor_mensual_vehiculo: ['', Validators.required]
    })
  }

  guardar() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }
    console.log(this.form);

  }


}
