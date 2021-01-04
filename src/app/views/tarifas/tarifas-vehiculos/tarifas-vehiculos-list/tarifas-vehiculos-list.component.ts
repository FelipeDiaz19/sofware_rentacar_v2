import { AgGridAngular } from 'ag-grid-angular';
import { TarifaVehiculo } from './../../../../models/tarifasVehiculos';
import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TarifasVehiculosService } from 'src/app/services/tarifas-vehiculos.service';

@Component({
  selector: 'app-tarifas-vehiculos-list',
  templateUrl: './tarifas-vehiculos-list.component.html',
  styleUrls: ['./tarifas-vehiculos-list.component.css']
})
export class TarifasVehiculosListComponent implements OnInit, OnChanges {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @Input() tarifaVehiculoList: TarifaVehiculo[];

  public defaultColDef: any;
  public rowData: any = [];
  public columnDefs: any = [];


  constructor(private _tarifasVehiculo: TarifasVehiculosService) {
    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true,
    };
    this.columnDefs = [
      {
        headerName: "Vehiculos", checkboxSelection: true, marryChildren: true, headerClass: 'btn-dark', children: [
          { headerName: 'patente', field: 'vehiculo.patente_vehiculo', },
          { headerName: 'marca', field: 'vehiculo.marca_vehiculo', },
          { headerName: 'modelo', field: 'vehiculo.modelo_vehiculo', },
          { headerName: 'tipo', width: 160, field: 'vehiculo.tipo_vehiculo', },
          { headerName: 'año', width: 100, field: 'vehiculo.año_vehiculo', },
        ]
      },
      {
        headerName: 'Precios diario (1 dia o mas)', marryChildren: true, headerClass: 'btn-danger', children: [
          { headerName: 'Valor neto', width: 140, field: 'valor_neto_diario' },
          { headerName: 'Iva', width: 120, field: 'valor_iva_diario' },
          { headerName: 'Total', width: 160, field: 'valor_total_diario' }
        ]
      },
      {
        headerName: 'Precios semanales (7 dias o mas)', marryChildren: true, headerClass: 'btn-success', children: [
          { headerName: 'Valor neto', width: 140, field: 'valor_neto_semanal' },
          { headerName: 'Iva', width: 120, field: 'valor_iva_semanal' },
          { headerName: 'Total', width: 160, field: 'valor_total_semanal' }
        ]
      },
      {
        headerName: 'Precios quincenales (15 dias o mas)', marryChildren: true, headerClass: 'btn-primary', children: [
          { headerName: 'Valor neto', width: 140, field: 'valor_neto_quincenal' },
          { headerName: 'Iva', width: 120, field: 'valor_iva_quincenal' },
          { headerName: 'Total', width: 160, field: 'valor_total_quincenal' }
        ]
      },
      {
        headerName: 'Precios mensuales (30 dias o mas)', marryChildren: true, headerClass: 'btn-info', children: [
          { headerName: 'Valor neto', width: 140, field: 'valor_neto_mensual' },
          { headerName: 'Iva', width: 120, field: 'valor_iva_mensual' },
          { headerName: 'Total', width: 160, field: 'valor_total_mensual' }
        ]
      },
    ];
  }



  ngOnChanges(changes: SimpleChanges): void {
    this.cargarTarifasAccesorio()
  }


  ngOnInit(): void {
    this.cargarTarifasAccesorio()
  }

  onFilterTextBoxChanged(text: string) {
    this.agGrid.api.setQuickFilter(text);
  }

  cargarTarifasAccesorio() {
    this._tarifasVehiculo.getAll().subscribe((data: TarifaVehiculo[]) => {
      this.rowData = data;
    })
  }



}
