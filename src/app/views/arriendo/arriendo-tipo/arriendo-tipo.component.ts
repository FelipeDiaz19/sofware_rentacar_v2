import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Arriendo } from 'src/app/models';

@Component({
  selector: 'app-arriendo-tipo',
  templateUrl: './arriendo-tipo.component.html',
  styleUrls: ['./arriendo-tipo.component.css']
})
export class ArriendoTipoComponent implements OnInit {
  @Input() arriendo: Arriendo = new Arriendo();

  form: FormGroup;

  constructor() {

  }

  ngOnInit(): void {

  }

  onChangeTipo(selecionTipo: string): void {

    if (this.arriendo.tipo_arriendo === 'PARTICULAR' && selecionTipo === 'REEMPLAZO') {
      console.log('cambia de particular a remplazo');
    }
    if (this.arriendo.tipo_arriendo === 'PARTICULAR' && selecionTipo === 'EMPRESA') {
      console.log('cambia de particular a empresa');
    }


    if (this.arriendo.tipo_arriendo === 'REEMPLAZO' && selecionTipo === 'PARTICULAR') {
      console.log('cambia de reemplazo a particular');
    }
    if (this.arriendo.tipo_arriendo === 'REEMPLAZO' && selecionTipo === 'EMPRESA') {
      console.log('cambia de reemplazo a empresa');
    }


    if (this.arriendo.tipo_arriendo === 'EMPRESA' && selecionTipo === 'PARTICULAR') {
      console.log('cambia de empresa a particular');
    }
    if (this.arriendo.tipo_arriendo === 'EMPRESA' && selecionTipo === 'REEMPLAZO') {
      console.log('cambia de empresa a reemplazo');
    }


  }

}
