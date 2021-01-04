import { RequestResponse } from './../../../../models/requestResponse';
import { TarifasVehiculosService } from './../../../../services/tarifas-vehiculos.service';
import { TarifaVehiculo } from './../../../../models/tarifasVehiculos';
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

  vehiculosSeleccion: Vehiculo[] = [];
  tarifasVehiculos: TarifaVehiculo[] = [];
  tarifaVehiculo: TarifaVehiculo = new TarifaVehiculo();
  form: FormGroup;
  rowData: any;
  defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
    headerClass: 'btn-dark',

  };
  columnDefs = [
    { headerName: 'patente', field: 'patente_vehiculo', checkboxSelection: true },
    { headerName: 'marca', field: 'marca_vehiculo', },
    { headerName: 'tipo', field: 'tipo_vehiculo', },
    { headerName: 'modelo', field: 'modelo_vehiculo', },
    { headerName: 'año', field: 'año_vehiculo', },
    { headerName: 'Region', field: 'regione.nombre_region', },
  ];


  constructor(private fb: FormBuilder, private _vehiculo: VehiculosService, private _alert: AlertHelper, private _tarifasVehiculo: TarifasVehiculosService) {
    this.generarFormulario();
  }

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos() {
    this._vehiculo.getAll().subscribe((data: Vehiculo[]) => {
      this.rowData = data;
    })
  }

  onFilterTextBoxChanged(text: string) {
    this.agGrid.api.setQuickFilter(text);
  }

  validarCampos(nombre: string): boolean {
    return this.form.get(nombre).invalid && this.form.get(nombre).touched;
  }

  generarFormulario(): void {
    this.form = this.fb.group({
      valor_neto_diario: ['', Validators.required],
      valor_neto_semanal: ['', Validators.required],
      valor_neto_quincenal: ['', Validators.required],
      valor_neto_mensual: ['', Validators.required]
    })
  }

  guardar() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }
    if (selectedNodes.length === 0) {
      this._alert.warningAlert("seleccione un vehiculo!", "se debe seleccionar un vehiculo");
      return;
    }
    this.tarifaVehiculo = this.form.value;
    selectedNodes.forEach((item) => {
      this.tarifasVehiculos.push({
        ...this.tarifaVehiculo, patente_vehiculo: item.data["patente_vehiculo"]
      })
    });
    this._tarifasVehiculo.createList(this.tarifasVehiculos).subscribe((response: RequestResponse) => {
      this._alert.createAlert(response.msg);
      this.tarifaVehiculo = new TarifaVehiculo();
      this.tarifasVehiculos.length = 0;
      this.vehiculosSeleccion.length = 0;
      this.form.reset();
      this.cargarVehiculos();
    });
  }


}
