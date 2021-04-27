import {Component, OnInit} from '@angular/core';
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
    {selector: 'app-tarifas-empresa-reemplazo-form', templateUrl: './tarifas-empresa-reemplazo-form.component.html', styleUrls: ['./tarifas-empresa-reemplazo-form.component.css']}
)
export class TarifasEmpresaReemplazoFormComponent implements OnInit {
    parentMessage = []

    sucursalesid = [];
    sucursales = [];
    empresaReemplazo = [];
    form: FormGroup;
    tarifaEmpresaReemplazoForm: FormGroup 
    Categorias_List = ['Seleccione categoria','AT','MT','4x2','4x4','Furgón','Mini Bus'];

    constructor(
        private fb : FormBuilder,
        private _alert : AlertHelper,
        private _sucursales : SucursalesService,
        private _empresasReemplazo : EmpresaRemplazoService,
        private _tarifasEmpresasReemplazo : TarifasEmpresasReemplazoService

    ) {

        this.generarFormulario();
    }

    ngOnInit(): void {

        this.cargarSucursal();
        this.cargarEmpresasReemplazo();
    }

    generarFormulario(): void {
        this.form = this.fb.group({Sucursal: ['', Validators.required],EmpresaReemplazo: ['', Validators.required],Categoria: ['', Validators.required],Valor: ['', Validators.required]})
    }

     public inputValidator(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-zA-Z0-9]*$/;   
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
        event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g, "");
      // invalid character, prevent input

    }
  }

    cargarSucursal(): void {
        this.sucursales.push('Seleccione Sucursal');
        this._sucursales.getAll().subscribe((sucursales : Sucursal[]) => {

            for (let i = 0; i < sucursales.length; i++) {
                this.sucursales.push(sucursales[i].nombre_sucursal)
                this.sucursalesid.push(sucursales[i].id_sucursal)
            }

        })
    }
    cargarEmpresasReemplazo(): void {
        this.empresaReemplazo.push('Seleccione empresa de reemplazo')
        this._empresasReemplazo.getAll().subscribe((empresaReemplazo : EmpresaRemplazo[]) => {

            for (let i = 0; i < empresaReemplazo.length; i++) {
                this.empresaReemplazo.push(empresaReemplazo[i].codigo_empresaRemplazo)
            }
        })
    }

    guardar(): void {

        if (this.form.valid) {

            Swal
                .fire(
                    {title: 'Desea guardar los cambios?', showDenyButton: true, showCancelButton: true, confirmButtonText: `Guardar`, denyButtonText: `No Guardar`}
                )
                .then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        for (let i = 0; i < this.sucursalesid.length; i++) {

                            if (this.sucursales[i] == this.form.value.Sucursal) {
                                this.form.value.Sucursal = this.sucursalesid[i]
                            }
                        }

                        this
                            ._tarifasEmpresasReemplazo
                            .create(this.form.value)
                            .subscribe((response : RequestResponse) => {
                                this
                                    ._alert
                                    .createAlert(response.msg);
                                this
                                    .form
                                    .reset();

                            });
                        Swal.fire('Guardado!', '', 'success')
                    } else if (result.isDenied) {
                        Swal.fire('Cambios no guardados', '', 'info')
                    }
                })

        } else {
            Swal.fire({icon: 'error',title: 'Oops...',text: 'Falta rellenar los los campos'})
        }
    }

}
