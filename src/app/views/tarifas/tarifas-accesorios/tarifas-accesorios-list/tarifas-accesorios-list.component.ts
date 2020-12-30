import { Component, OnInit, ViewChild, Output, EventEmitter, Input, OnChanges, SimpleChanges, } from '@angular/core';
import { AccesoriosService } from 'src/app/services/accesorios.service';
import { Accesorio } from 'src/app/models/accesorios';
import { AgGridAngular } from 'ag-grid-angular';
import { AlertHelper } from 'src/app/helpers/alert.helper';
import * as moment from 'moment';

@Component({
  selector: 'app-tarifas-accesorios-list',
  templateUrl: './tarifas-accesorios-list.component.html',
  styleUrls: ['./tarifas-accesorios-list.component.css']
})
export class TarifasAccesoriosListComponent implements OnInit, OnChanges {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @Input() accesorioList: Accesorio;
  @Input() seleccionList: Accesorio;

  @Output() seleccionAccesorio = new EventEmitter<Accesorio>();
  @Output() quitarSeleccion = new EventEmitter<Accesorio>();

  accesorios: Accesorio[] = [];
  accesorio: Accesorio;
  rowData: any;

  columnDefs = [
    { headerName: 'codigo', field: 'id_accesorio', sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'Sucursal', field: 'sucursale.nombre_sucursal', sortable: true, filter: true },
    { headerName: 'nombre accesorio', field: 'nombre_accesorio', sortable: true, filter: true },
    { headerName: 'precio neto', field: 'precio_accesorio', sortable: true, filter: true },
    { headerName: 'fecha registro', field: 'createdAt', sortable: true, filter: true },
    { headerName: 'usuario', field: 'userAt', sortable: true, filter: true },
  ];

  constructor(private _accesorio: AccesoriosService, private alert: AlertHelper) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.seleccionList) {
      this.buscarAccesorios();
    }
  }

  ngOnInit(): void {
    this.buscarAccesorios();
  }

  buscarAccesorios() {
    this._accesorio.getAll().subscribe(response => {
      response.data.map((accesorio: Accesorio) => {
        accesorio.createdAt = moment(accesorio.createdAt).format("DD/MM/YYYY, h:mm:ss a");
      })
      this.accesorios = response.data;
      this.rowData = this.accesorios;
    })
  }



  seleccionarColumna() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    if (selectedNodes.length == 0) {
      this.alert.warningAlert("falta seleccionar columna", "debe seleccionar un elemento");
      return;
    }
    this.accesorio = selectedNodes[0].data;
    this.seleccionAccesorio.emit(this.accesorio);
  }


  eliminarSeleccion() {
    this.quitarSeleccion.emit(new Accesorio());
  }




}
