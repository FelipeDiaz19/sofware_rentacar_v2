import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Arriendo, Sucursal, Vehiculo } from 'src/app/models';
import { VehiculosService } from 'src/app/services/vehiculos.service';
import * as moment from 'moment';
import { SucursalesService } from 'src/app/services/sucursales.service';


@Component({
  selector: 'app-arriendo-form',
  templateUrl: './arriendo-form.component.html',
  styleUrls: ['./arriendo-form.component.css']
})
export class ArriendoFormComponent implements OnInit {
  @Input() arriendo: Arriendo = new Arriendo();
  @Output() sendForm = new EventEmitter<FormGroup>();

  form: FormGroup;
  vehiculos: Vehiculo[] = [];
  sucursales: Sucursal[] = [];
  campoDia: boolean;
  campoVehiculo: boolean;

  constructor(private fb: FormBuilder, private serviceVehiculo: VehiculosService, private serviceSucursal: SucursalesService) {
  }

  ngOnInit(): void {
    this.generarFormulario();
    this.cargarVehiculos();
    this.cargarSucursales();
  }

  warningDia(): void {
    this.campoDia = true;
  }
  warningVehiculo(): void {
    this.campoVehiculo = true;
  }

  cargarSucursales(): void {
    this.serviceSucursal.getAll().subscribe((data: Sucursal[]) => {
      this.sucursales = data;
    });
  }

  cargarVehiculos(): void {
    this.serviceVehiculo.getAll().subscribe((data: Vehiculo[]) => {
      this.vehiculos = data;
    });
  }

  generarFormulario(): void {
    this.form = this.fb.group({
      ciudadEntrega_arriendo: [this.arriendo.ciudadEntrega_arriendo, Validators.required],
      ciudadRecepcion_arriendo: [this.arriendo.ciudadRecepcion_arriendo, Validators.required],
      fechaEntrega_arriendo: [moment(this.arriendo.fechaEntrega_arriendo).format('yyyy-MM-DDTHH:mm'), Validators.required],
      fechaRecepcion_arriendo: [moment(this.arriendo.fechaRecepcion_arriendo).format('yyyy-MM-DDTHH:mm'), Validators.required],
      diasActuales_arriendo: [this.arriendo.diasActuales_arriendo, Validators.required],
      kilometrosEntrada_arriendo: [this.arriendo.kilometrosEntrada_arriendo, Validators.required],
      patente_vehiculo: [this.arriendo.patente_vehiculo, Validators.required],
    });
  }


  validarCampos(nombre: string): boolean {
    return this.form.get(nombre).invalid && this.form.get(nombre).touched;
  }

  onChange(): void {
    this.sendForm.emit(this.form);
  }

  calcularDias(): void {
    const fechaIni = new Date(this.form.value.fechaEntrega_arriendo);
    const fechaFin = new Date(this.form.value.fechaRecepcion_arriendo);
    const diasDif = fechaFin.getTime() - fechaIni.getTime();
    const dias: number = Math.round(diasDif / (1000 * 60 * 60 * 24));
    this.arriendo.diasActuales_arriendo = dias;
    this.form.get('diasActuales_arriendo').setValue(dias);
    this.campoDia = true;
    this.onChange();
  }



}
