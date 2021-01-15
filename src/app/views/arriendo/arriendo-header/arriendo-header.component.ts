import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertHelper } from 'src/app/helpers/alert.helper';
import { Arriendo, RequestResponse } from 'src/app/models';
import { ArriendoService } from 'src/app/services/arriendo.service';
import { ContactoService } from 'src/app/services/contacto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-arriendo-header',
  templateUrl: './arriendo-header.component.html',
  styleUrls: ['./arriendo-header.component.css']
})
export class ArriendoHeaderComponent implements OnInit {

  arriendo: Arriendo;
  formArriendo: FormGroup = null;
  formContacto: FormGroup = null;
  cambiarTipo: number = null;
  empresaRemplazo: string = null;

  constructor(
    private serviceArriendo: ArriendoService,
    private serviceContacto: ContactoService,
    private helperAlert: AlertHelper,
    private router: Router) { }

  ngOnInit(): void {
  }

  inicio(): void {
    this.router.navigate(['home']);
  }

  buscarArriendo(ID: number): void {
    this.reiniciarValores();
    this.serviceArriendo.findArriendo(ID).subscribe((response: RequestResponse) => {
      if (!response.success) {
        this.helperAlert.warningAlert(response.msg, 'Nº de folio incorrecto');
        return;
      }
      if (response.data) {
        const estado = response.data.estado_arriendo;
        if (estado !== 'PENDIENTE' && estado !== 'CONFIRMADO' && estado !== 'FIRMADO') {
          this.helperAlert.warningAlert('Este arriendo ya esta activo!', 'Solo es posible modificar arriendos si este aun no a sido despachado');
          return;
        }
      }
      this.arriendo = response.data;
    });
  }

  reiniciarValores(): void {
    this.arriendo = null;
    this.formArriendo = null;
    this.cambiarTipo = null;
  }

  guardarCambios(): void {
    if (!this.validarFormularios()) {
      this.helperAlert.warningAlert('campos incompletos', 'relleno los campos faltantes');
      return;
    }
    if (this.cambiarTipo) {
      this.modificarTipoArriendo();
    }
    if (this.formArriendo) {
      this.modificarInfoArriendo();
    }
    if (this.formContacto) {
      this.modificarContactoArriendo();
    }
  }

  modificarTipoArriendo(): void {
    const ID = this.arriendo.id_arriendo;
    const idEmpresa = this.empresaRemplazo;
    const tipoArriendo = this.cambiarTipo;
    this.helperAlert.loadingAlert();
    this.serviceArriendo.modificarTipo(ID, tipoArriendo, idEmpresa).subscribe((response: RequestResponse) => {
      if (response.success) {
        this.helperAlert.updateAlert('cambios realizados!');
        this.reiniciarVistaFirma();
        this.reiniciarVistaRequisito();
        this.reiniciarVistaPago();
      }
    });
  }

  modificarInfoArriendo(): void {
    const arriendoForm = this.formArriendo.value;
    this.helperAlert.loadingAlert();
    this.serviceArriendo.modificarInfo(arriendoForm).subscribe((response: RequestResponse) => {
      if (response.success) {
        this.reiniciarVistaFirma();
        if (this.arriendo.diasActuales_arriendo !== arriendoForm.diasActuales_arriendo) {
          this.reiniciarVistaPago();
        }
        if (this.arriendo.patente_vehiculo !== arriendoForm.arriendo.patente_vehiculo) {
          this.reiniciarVistaPago();
        }
        this.helperAlert.updateAlert('cambios realizados!');
      }
    });
  }

  modificarContactoArriendo(): void {
    const contactoForm = this.formContacto.value;
    this.helperAlert.loadingAlert();
    this.serviceContacto.modificarContacto(contactoForm).subscribe((response: RequestResponse) => {
      if (response.success) {
        this.reiniciarVistaFirma();
        this.helperAlert.updateAlert('cambios realizados!');
      }
    });
  }

  confirmarCambios(option: number): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'esto provocara que se borren algunos datos!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, seguro',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (option === 0) {
          this.guardarCambios();
        }
        if (option === 1) {
          this.reiniciarVistaFirma();
          this.reiniciarVistaRequisito();
        }
        if (option === 2) {
          this.reiniciarVistaFirma();
          this.reiniciarVistaPago();
        }
        if (option === 3) {
          this.reiniciarVistaFirma();
        }
      }
    });
  }


  reiniciarVistaRequisito(): void {
    this.serviceArriendo.rollbackVistarequisitos(this.arriendo.id_arriendo).subscribe((response: RequestResponse) => {
      console.log(response);
    });
  }

  reiniciarVistaPago(): void {
    this.serviceArriendo.rollbackVistaPago(this.arriendo.id_arriendo).subscribe((response: RequestResponse) => {
      console.log(response);
    });
  }

  reiniciarVistaFirma(): void {
    this.serviceArriendo.rollbackVistaPago(this.arriendo.id_arriendo).subscribe((response: RequestResponse) => {
      console.log(response);
    });
  }



  validarFormularios(): boolean {
    if (this.formArriendo) {
      if (this.formArriendo.invalid) {
        return false;
      }
    }
    if (this.formContacto) {
      if (this.formContacto.invalid) {
        return false;
      }
    }
    return true;
  }



}
