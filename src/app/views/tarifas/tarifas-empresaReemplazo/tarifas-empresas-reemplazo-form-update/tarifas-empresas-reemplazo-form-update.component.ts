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

@Component(
    {selector: 'app-tarifas-empresas-reemplazo-form-update', templateUrl: './tarifas-empresas-reemplazo-form-update.component.html', styleUrls: ['./tarifas-empresas-reemplazo-form-update.component.css']}
)
export class TarifasEmpresasReemplazoFormUpdateComponent implements OnInit {

    TarifaPorEmpresaReemplazo = [];
    Vision=false;
    Vision2=false;
    sucursales = [];
    sucursalesName = [];
    EmpresaReemplazo = [];
    form: FormGroup;
    form2: FormGroup;
    formUpdate: FormGroup;
    UPCodigo = "";
    UPSucursal = "";
    UPCategoria = "";
    UPValor = "";
    data=[];
    Categorias_List=['Seleccione Empresa Reemplazo','AT','MT','4x2','4x4','Furgón','Mini Bus'];
    tarifasEmpresasReemplazo: TarifasEmpresasReemplazo[] = [];

    constructor(
        private fb : FormBuilder,
        private _alert : AlertHelper,
        private _sucursales : SucursalesService,
        private _empresasReemplazo : EmpresaRemplazoService,
        private _tarifasEmpresasReemplazo : TarifasEmpresasReemplazoService
    ) {
        this.generarFormulario();
        this.generarFormularioUpdate();
    }

    ngOnInit(): void {
        this.cargarEmpresasReemplazo();
        var sucursales = this.cargarSucursal();

    }

    onSave(codigo) {

        console.log(codigo);
        this.UPCodigo = codigo.id_tarifaEmpresaRemplazo;
        this.UPSucursal = codigo.id_sucursal;
        this.UPCategoria = codigo.categoria;
        this.UPValor = codigo.valor;
        this.tarifasEmpresasReemplazo= codigo
    }
    ActualizarDato() {

        if (this.formUpdate.valid) {



            Swal
                .fire(
                    {title: 'Desea guardar los cambios?', showDenyButton: true, showCancelButton: true, confirmButtonText: `Guardar`, denyButtonText: `No Guardar`}
                )
                .then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        let num = this.UPCodigo;
                        let data = {
                        EmpresaReemplazo:this.formUpdate.value.EmpresaReemplazo,
                        Categoria:this.formUpdate.value.Categoria,
                        Sucursal:this.formUpdate.value.Sucursales,
                        Valor:this.formUpdate.value.Valor,
                        }
                        console.log(num);
                        console.log(data);

                        this._tarifasEmpresasReemplazo .UpdateTarifa(num,data).subscribe((response : RequestResponse) => {
                                this._alert.createAlert(response.msg);
                                this.form.reset();
                        })
                       
                        Swal.fire('Guardado!', '', 'success')
                    } else if (result.isDenied) {
                        Swal.fire('Cambios no guardados', '', 'info')
                    }
                })





        } else {
                       Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Falta rellenar los los campos',
                })
        }
    }

    cargarEmpresasReemplazo() {
        this
            ._empresasReemplazo
            .getAll()
            .subscribe((EmpresaReemplazo : EmpresaRemplazo[]) => {
                for (let i = 0; i < EmpresaReemplazo.length; i++) {
                    this
                        .EmpresaReemplazo
                        .push(EmpresaReemplazo[i].codigo_empresaRemplazo)
                }
            })
    }

    generarFormulario(): void {
        this.form = this.fb.group({EmpresaReemplazo: ['', Validators.required]})
        this.form2 = this.fb.group({Sucursal: ['', Validators.required]})
    }
    generarFormularioUpdate(): void {
        this.formUpdate = this
            .fb
            .group({
                EmpresaReemplazo: [
                    '', Validators.required
                ],
                Sucursales: [
                    '', Validators.required
                ],
                Categoria: [
                    '', Validators.required
                ],
                Valor: ['', Validators.required]
            })
    }

    cargarSucursal() {
        this
            ._sucursales
            .getAll()
            .subscribe((sucursales : Sucursal[]) => {
                this.sucursales = sucursales;

                for (let i = 0; i < sucursales.length; i++) {
                  
                  this.sucursalesName.push(sucursales[i].nombre_sucursal);
                }
                
                return sucursales;
            })
    }

    CargarTablaConSucursales() {
        this.Vision = false;
        this.data= [];


        if (this.form2.valid) {

            var valor = this.form2.value.Sucursal;
            console.log(valor);

            this._tarifasEmpresasReemplazo.getAll().subscribe((TarifaEmpresaReemplazo : TarifasEmpresasReemplazo[]) => {
                    TarifaEmpresaReemplazo;

                    for (let i = 0; i < TarifaEmpresaReemplazo.length; i++) {

                        if (TarifaEmpresaReemplazo[i].NombreSucursal == valor) {
                            this.data.push({Sucursal: TarifaEmpresaReemplazo[i].NombreSucursal, Empresa: TarifaEmpresaReemplazo[i].codigo_empresaRemplazo, Categoria: TarifaEmpresaReemplazo[i].categoria, Monto: TarifaEmpresaReemplazo[i].valor,id_tarifaEmpresaRemplazo:TarifaEmpresaReemplazo[i].id_tarifaEmpresaRemplazo}
                                )
                        }

                    }

                });
            this.Vision2 = true;
        } else {
                       Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Falta rellenar los los campos',
                })
        }

    }

    buscar() {

        this.Vision2=false;
        if (this.form.valid) {


            var valor = this.form.value;
            this._tarifasEmpresasReemplazo.getAllPorEmpresaReemplazo(valor.EmpresaReemplazo).subscribe((TarifaPorEmpresaReemplazo : TarifasEmpresasReemplazo[]) => {
                    this.TarifaPorEmpresaReemplazo = TarifaPorEmpresaReemplazo;
                })
            
                this.Vision=true;

        } else {
                       Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Falta rellenar los los campos',
                })
        }
    }

}






