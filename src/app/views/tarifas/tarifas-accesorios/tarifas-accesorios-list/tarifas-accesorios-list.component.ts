import Swal from 'sweetalert2';
import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { AccesoriosService } from 'src/app/services/accesorios.service';
import { Accesorio } from 'src/app/models/accesorios';
import { AgGridAngular } from 'ag-grid-angular';


@Component({
  selector: 'app-tarifas-accesorios-list',
  templateUrl: './tarifas-accesorios-list.component.html',
  styleUrls: ['./tarifas-accesorios-list.component.css']
})
export class TarifasAccesoriosListComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
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



  constructor(private accesorioService: AccesoriosService) { }

  ngOnInit(): void {
    this.buscarAccesorios();
  }

  buscarAccesorios() {
    this.rowData = this.accesorioService.getAll();
  }



  seleccionarColumna() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    if (selectedNodes.length == 0) {
      Swal.fire({
        title: "falta seleccionar columna",
        text: "debe seleccionar un elemento",
        icon: "warning"
      })
      return;
    }
    this.accesorio = selectedNodes[0].data;
    this.seleccionAccesorio.emit(this.accesorio);
  }


  eliminarSeleccion() {
    this.quitarSeleccion.emit(new Accesorio());
  }




}
