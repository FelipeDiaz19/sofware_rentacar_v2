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
    this.serviceArriendo.modificarTipo(ID, tipoArriendo, idEmpresa).subscribe();
    this.reiniciarVistaFirma();
    this.reiniciarVistaPago();
    this.reiniciarVistaRequisito();
  }

  modificarInfoArriendo(): void {
    const arriendoForm = this.formArriendo.value;
    const id_arriendo = this.arriendo.id_arriendo;
    this.helperAlert.loadingAlert();
    this.serviceArriendo.modificarInfo(id_arriendo, arriendoForm).subscribe();
    this.reiniciarVistaFirma();
    if (this.arriendo.diasActuales_arriendo !== arriendoForm.diasActuales_arriendo || this.arriendo.patente_vehiculo !== arriendoForm.patente_vehiculo) {
      this.reiniciarVistaPago();
    }

  }

  modificarContactoArriendo(): void {
    const contactoForm = this.formContacto.value;
    const idContacto = this.arriendo['contacto']['id_contacto'];
    this.helperAlert.loadingAlert();
    this.serviceContacto.modificarContacto(idContacto, contactoForm).subscribe();
    this.reiniciarVistaFirma();
  }

  confirmarCambios(option: number): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'esto provocara que se modifiquen y/o borren algunos datos!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, seguro',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.helperAlert.loadingAlert();
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
    let idArriendo = this.arriendo.id_arriendo;
    setTimeout(() => {
      this.serviceArriendo.rollbackVistaRequisitos(idArriendo).subscribe((response: RequestResponse) => {
        if (response.success) {
          this.helperAlert.updateAlert('cambios realizados!');
        }
      });
    }, 1000);
  }

  reiniciarVistaPago(): void {
    let idArriendo = this.arriendo.id_arriendo;
    setTimeout(() => {
      this.serviceArriendo.rollbackVistaPago(idArriendo).subscribe((response: RequestResponse) => {
        if (response.success) {
          this.helperAlert.updateAlert('cambios realizados!');
        }
      });
    }, 1000)
  }

  reiniciarVistaFirma(): void {
    let idArriendo = this.arriendo.id_arriendo;
    setTimeout(() => {
      this.serviceArriendo.rollbackVistaFirma(idArriendo).subscribe((response: RequestResponse) => {
        if (response.success) {
          this.helperAlert.updateAlert('cambios realizados!');
        }
      });
    }, 1000);
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
