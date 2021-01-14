import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertHelper } from 'src/app/helpers/alert.helper';
import { Arriendo, RequestResponse } from 'src/app/models';
import { ArriendoService } from 'src/app/services/arriendo.service';

@Component({
  selector: 'app-arriendo-header',
  templateUrl: './arriendo-header.component.html',
  styleUrls: ['./arriendo-header.component.css']
})
export class ArriendoHeaderComponent implements OnInit {

  arriendo: Arriendo;
  formArriendo: FormGroup;

  constructor(private serviceArriendo: ArriendoService, private helperAlert: AlertHelper, private router: Router) { }

  ngOnInit(): void {
  }

  inicio(): void {
    this.router.navigate(['home']);
  }

  buscarArriendo(ID: number): void {
    this.arriendo = null;
    this.serviceArriendo.findArriendo(ID).subscribe((response: RequestResponse) => {
      if (!response.success) {
        this.helperAlert.warningAlert(response.msg, 'Nº de folio incorrecto');
        return;
      }
      if (response.data) {
        const estado = response.data.estado_arriendo;
        if (estado !== 'PENDIENTE' && estado !== 'CONFIRMADO') {
          this.helperAlert.warningAlert('Este arriendo ya esta firmado!', 'Solo es posible modificar arriendos si el contrato aún no ha sido firmado');
          return;
        }
      }
      this.arriendo = response.data;
    });
  }

  guardarCambios(): void {
    console.log(this.formArriendo);

    // enviar todo al servidor
  }



}
