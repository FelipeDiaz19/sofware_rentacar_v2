import { AlertHelper } from 'src/app/helpers/alert.helper';
import { VehiculosService } from './../../../../services/vehiculos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Vehiculo } from 'src/app/models';
import { AgGridAngular } from 'ag-grid-angular';


@Component({
  selector: 'app-tarifas-vehiculos-form',
  templateUrl: './tarifas-vehiculos-form.component.html',
  styleUrls: ['./tarifas-vehiculos-form.component.css']
})
export class TarifasVehiculosFormComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  vehiculos: Vehiculo[] = [];
  form: FormGroup;
  rowData: any;

  columnDefs = [
    { headerName: 'patente', field: 'patente_vehiculo', sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'marca', field: 'marca_vehiculo', sortable: true, filter: true },
    { headerName: 'tipo', field: 'tipo_vehiculo', sortable: true, filter: true },
    { headerName: 'modelo', field: 'modelo_vehiculo', sortable: true, filter: true },
    { headerName: 'año', field: 'año_vehiculo', sortable: true, filter: true },
    { headerName: 'Region', field: 'regione.nombre_region', sortable: true, filter: true },

  ];


  constructor(private fb: FormBuilder, private _vehiculo: VehiculosService, private _alert: AlertHelper) {
    this.generarFormulario();
  }

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos() {
    this._vehiculo.getVehiculos().subscribe(response => {
      this.vehiculos = response.data;
      this.rowData = this.vehiculos;
    })
  }



  validarCampos(nombre: string): boolean {
    return this.form.get(nombre) && this.form.get(nombre).touched;
  }

  generarFormulario(): void {
    this.form = this.fb.group({
      valor_diario_vehiculo: ['', Validators.required],
      valor_semanal_vehiculo: ['', Validators.required],
      valor_quincenal_vehiculo: ['', Validators.required],
      valor_mensual_vehiculo: ['', Validators.required]
    })
  }

  guardar() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    console.log(this.form.invalid);
    console.log(this.form);

    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }

    if (selectedNodes.length === 0) {
      this._alert.warningAlert("seleccione un vehiculo!", "se debe seleccionar un vehiculo");
      return;
    }

    //extraer datos y corregir los input denegados del form
    console.log(selectedNodes);

  }


}
