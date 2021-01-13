import { Component, OnInit } from '@angular/core';
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

  constructor(private _arriendo: ArriendoService, private _alert: AlertHelper) { }

  ngOnInit(): void {
  }


  buscarArriendo(ID: number): void {
    this._arriendo.findArriendo(ID).subscribe((response: RequestResponse) => {

      if (!response.success) {
        this._alert.warningAlert(response.msg, "Nº de folio incorrecto");
        return;
      }

      if (response.data) {
        const estado = response.data.estado_arriendo;
        if (estado != "PENDIENTE" && estado != "CONFIRMADO") {
          this._alert.warningAlert("Este arriendo ya esta firmado!", "Solo es posible modificar arriendos si el contrato aún no ha sido firmado");
          return;
        }
      }

      this.arriendo = response.data;
      console.log(this.arriendo);


    });
  }



}
