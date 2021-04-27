import {Component, OnInit, Input} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {SucursalesService} from './../../../../services/sucursales.service';
import {EmpresaRemplazoService} from './../../../../services/empresa-remplazo.service';
import {TarifasEmpresasReemplazoService} from './../../../../services/tarifas-empresasReemplazo.service';
import {TarifasEmpresasReemplazo} from './../../../../models'
import {Sucursal} from './../../../../models'
import {AlertHelper} from 'src/app/helpers/alert.helper';
import {EmpresaRemplazo} from './../../../../models'
import {RequestResponse} from './../../../../models/requestResponse';
import Swal from 'sweetalert2';


interface Datos {
  Sucursal: string;
  Empresa: string;
  Categoria: string;
  Monto: number;
}

@Component({
  selector: 'app-tarifas-empresa-reemplazo-listm',
  templateUrl: './tarifas-empresa-reemplazo-listm.component.html',
  styleUrls: ['./tarifas-empresa-reemplazo-listm.component.css']
})


export class TarifasEmpresaReemplazoListmComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  
  @Input() childMessage: [];

  info: Datos [];
  data: any = [];
  page = 1;
  pageSize = 4;
  collectionSize=5;
 

  TarifaEmpresaReemplazo = [];
  TarifaPorEmpresaReemplazo = [];
  CategoriaList = [];
  groupByCategoria = new Map();
  sucursales = [];
  rowdate =[];
  sucursalesName = [];
  EmpresaReemplazo = [];
  form: FormGroup;
  form2: FormGroup;
  Categorias_List=['Seleccione categoria','AT','MT','4x2','4x4','Furgón','Mini Bus'];
  Vision=false;
  Vision2=false;
  rowData : any = [];
  columnDefs: any = [];
  dataTable= [];
 


  constructor(
        private fb : FormBuilder,
        private _alert : AlertHelper,
        private _sucursales : SucursalesService,
        private _empresasReemplazo : EmpresaRemplazoService,
        private _tarifasEmpresasReemplazo : TarifasEmpresasReemplazoService
  ) {


      this.generarFormulario();
      this.refreshData();
      

   }

  ngOnInit(): void {

    var empresasReemplazo = this.cargarEmpresasReemplazo();
    //var tarifas =this.cargarTarifasEmpresasReemplazo();
    var sucursales = this.cargarSucursal();

  
      this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        search: "Buscar:",
          lengthMenu:    "Archivos _MENU_ Elementos",
        info:           "Elemento _START_ de _END_ . Total _TOTAL_ Elementos",
        loadingRecords: "Cargando",
        emptyTable:     "Tabla Vacia",
        paginate: {
            first:      "Inicio",
            previous:   "Anterior",
            next:       "Siguiente",
            last:       "Final"
        },
        aria: {
            sortAscending:  ": Orden Ascendente",
            sortDescending: ": Orden Desendente"
        }
      }
    };

    

  }

    refreshData() {
    this.info = this.data
      .map((datos, i) => ({id: i + 1, ...datos}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  generarFormulario():void {
      this.form = this .fb .group({ EmpresaReemplazo: ['', Validators.required], })
      this.form2 = this .fb .group({ Sucursales: ['', Validators.required], })
  }
  createNewRowData(grouped){
    var Auxiliar=[];
    var rowDataTarifas=[];
    var MontoTalca=0;
    var MontoLinares=0;
    var MontoRancagua=0;
    var MontoCurico=0;
    var Categorias = [];

    for (let key of grouped.keys()) {
      Categorias.push(key);
    }


    for (let i = 0; i < Categorias.length; i++) {

      MontoTalca=0;
      MontoLinares=0;
      MontoRancagua=0;
      MontoCurico=0;

      var Montos= grouped.get(Categorias[i]);

      for (let i = 0; i < Montos.length; i++) {

        var nombre = Montos[i].NombreSucursal;
        
        if (nombre=="TALCA") {  //ID  Asignado A Talca
          MontoTalca = Montos[i].valor
          
        }
        if (nombre=="LINARES"){
          MontoLinares = Montos[i].valor
        }

        if (nombre=="RANCAGUA") {  //ID  Asignado A Talca
          MontoRancagua = Montos[i].valor
          
        }    
        if (nombre=="CURICO") {  //ID  Asignado A Talca
          MontoCurico = Montos[i].valor
          
        }        
      }

      rowDataTarifas.push({VEHICULOS:Categorias[i],TALCA:MontoTalca,LINARES:MontoLinares,RANCAGUA:MontoRancagua,CURICO:MontoCurico});
      
    }

  

  return rowDataTarifas;

  }
  createNewColumnsDef(sucursales){
    var columnDefs = [];
    //blah blah
    columnDefs.push({field:'VEHICULOS',sortable: true, filter: true,headerClass: 'btn-dark',resizable: true,minWidth: 200,maxWidth: 350,flex: 2,});
    for (let i = 0; i < sucursales.length; i++) {
      columnDefs.push({field: sucursales[i].nombre_sucursal,sortable: true, filter: true,headerClass: 'btn-dark',resizable: true,minWidth: 200,maxWidth: 350,flex: 2,})
    }
    return columnDefs;
  }

  cargarSucursal() {
        this._sucursales.getAll().subscribe((sucursales : Sucursal[]) => {
          this.sucursales=sucursales;

          for (let i = 0; i < this.sucursales.length; i++) {
            this.sucursalesName.push(sucursales[i].nombre_sucursal);
            
          }
          
          this.columnDefs = this.createNewColumnsDef(sucursales);
          return sucursales;
        })
    }


      cargarEmpresasReemplazo() {
        this.EmpresaReemplazo.push('Seleccion Empresa de Reemplazo')

        this._empresasReemplazo.getAll().subscribe((empresaReemplazo : EmpresaRemplazo[]) => {

                for (let i = 0; i < empresaReemplazo.length; i++) {
                    this
                        .EmpresaReemplazo
                        .push(empresaReemplazo[i].codigo_empresaRemplazo)

                }

        })
    }



    cargarTarifasEmpresasReemplazo() {
        this._tarifasEmpresasReemplazo.getAll().subscribe((TarifaEmpresaReemplazo : TarifasEmpresasReemplazo[]) => {
          return TarifaEmpresaReemplazo;
        })
    }
    // en esta funcion se clasifica por categoria y se crean las filas del componente list
    GroupByCategoriaPorEmpresasReemplazo(empresa) {
        this._tarifasEmpresasReemplazo.getAllPorEmpresaReemplazo(empresa).subscribe((TarifaPorEmpresaReemplazo : TarifasEmpresasReemplazo[] ) => {

            const grouped = this.groupBy(TarifaPorEmpresaReemplazo, tarifas => tarifas.categoria);
            this.rowData = this.createNewRowData(grouped);
            return grouped;
        })
    }

  groupBy(list, keyGetter) {
      const map = new Map();
      
      list.forEach((item) => {
          const key = keyGetter(item);
          const collection = map.get(key);
          if (!collection) {
              map.set(key, [item]);
          } else {
              collection.push(item);
          }
      });
      return map;
  }

  buscar(): void {

      if (this.form.valid) {

          var valor = this.form.value;
          console.log(valor.EmpresaReemplazo);
          this.GroupByCategoriaPorEmpresasReemplazo(valor.EmpresaReemplazo);
   
          this.Vision=true;
          this.Vision2=false;
          this.form.reset();

      } else {
           Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Falta rellenar los los campos',
                })
      }
  }



  CargarTablaConSucursales() {

     this.data=[];


    if (this.form2.valid) {
      
  
      var valor = this.form2.value.Sucursales;

      this._tarifasEmpresasReemplazo.getAll().subscribe((TarifaEmpresaReemplazo : TarifasEmpresasReemplazo[]) => {
            TarifaEmpresaReemplazo;
            console.log(TarifaEmpresaReemplazo);
            for (let i = 0; i < TarifaEmpresaReemplazo.length; i++) {

              if (TarifaEmpresaReemplazo[i].NombreSucursal==valor) {
                this.data.push({Sucursal: TarifaEmpresaReemplazo[i].NombreSucursal,Empresa:TarifaEmpresaReemplazo[i].codigo_empresaRemplazo,
                Categoria: TarifaEmpresaReemplazo[i].categoria,Monto:TarifaEmpresaReemplazo[i].valor})
              }
              
              
            }

          


      });

        



        this.Vision2 = true;
        this.Vision = false;
        this
            .form2
            .reset();

    } else {
         Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Falta rellenar los los campos',
                })
    }
}



}
