import { Component, OnInit, ViewChild, Output, EventEmitter, Input, OnChanges, SimpleChanges, } from '@angular/core';
import { AccesoriosService } from 'src/app/services/accesorios.service';
import { Accesorio } from 'src/app/models/accesorios';
import { AgGridAngular } from 'ag-grid-angular';
import { AlertHelper } from 'src/app/helpers/alert.helper';


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
  defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
    headerClass: 'btn-dark',

  };
  columnDefs = [
    { headerName: 'codigo', width: 130, field: 'id_accesorio', checkboxSelection: true },
    { headerName: 'Sucursal', width: 160, field: 'sucursale.nombre_sucursal', },
    { headerName: 'nombre accesorio', width: 250, field: 'nombre_accesorio', },
    { headerName: 'precio neto', width: 140, field: 'precio_accesorio', },
    { headerName: 'precio iva', width: 120, field: 'iva_accesorio', },
    { headerName: 'precio bruto', width: 140, field: 'total_accesorio', },
    { headerName: 'fecha registro', width: 300, field: 'createdAt', },
  ];

  constructor(private _accesorio: AccesoriosService, private alert: AlertHelper) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.seleccionList) {
      this.cargarAccesorios();
    }
  }

  ngOnInit(): void {
    this.cargarAccesorios();
  }

  cargarAccesorios() {
    this._accesorio.getAll().subscribe((data: Accesorio[]) => {
      this.rowData = data;
    })
  }



  seleccionarColumna() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    if (selectedNodes.length == 0) {
      this.alert.warningAlert("falta seleccionar columna", "debe seleccionar un elemento");
      return;
    }
    const id_accesorio = selectedNodes[0].data["id_accesorio"];
    this._accesorio.getOne(id_accesorio).subscribe(request => {
      this.accesorio = request.data;
      this.seleccionAccesorio.emit(this.accesorio);
    })
  }


  eliminarSeleccion() {
    this.quitarSeleccion.emit(new Accesorio());
  }





}
