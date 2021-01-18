import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Arriendo, EmpresaRemplazo } from 'src/app/models';
import { EmpresaRemplazoService } from 'src/app/services/empresa-remplazo.service';

@Component({
  selector: 'app-arriendo-tipo',
  templateUrl: './arriendo-tipo.component.html',
  styleUrls: ['./arriendo-tipo.component.css']
})
export class ArriendoTipoComponent implements OnInit {


  @Input() arriendo: Arriendo = new Arriendo();
  @Output() sendOptionTipo = new EventEmitter<number>();
  @Output() sendOptionER = new EventEmitter<string>();


  campoTipo: boolean;
  options: number = null;
  empresasRemplazo: EmpresaRemplazo[] = [];
  selectERemplazo: string = null;
  empresaActual: string = '';

  constructor(private serviceERemplazo: EmpresaRemplazoService) { }

  ngOnInit(): void {
    this.cargarEmpresaRemplazo();
    if (this.arriendo['remplazo']) {
      this.empresaActual = `(empresa actual ${this.arriendo['remplazo']['codigo_empresaRemplazo']})`;
    }
  }

  cargarEmpresaRemplazo(): void {
    this.serviceERemplazo.getAll().subscribe((data: EmpresaRemplazo[]) => {
      this.empresasRemplazo = data;
    });
  }


  onChangeTipo(selecionTipo: string = null): void {
    if (this.arriendo.tipo_arriendo === selecionTipo) {
      this.options = null;
      this.campoTipo = false;
    }

    if (this.arriendo['remplazo']) {
      if (this.arriendo['remplazo']['codigo_empresaRemplazo'] !== this.selectERemplazo) {
        console.log('cambia la empresa de remplazo');
        this.options = 3;
      }
    }

    if (this.arriendo.tipo_arriendo === 'PARTICULAR' && selecionTipo === 'REEMPLAZO') {
      console.log('cambia de particular a remplazo');
      this.options = 1;
    }
    if (this.arriendo.tipo_arriendo === 'REEMPLAZO' && selecionTipo === 'PARTICULAR') {
      console.log('cambia de reemplazo a particular');
      this.options = 2;
    }
    if (this.arriendo.tipo_arriendo === 'PARTICULAR' && selecionTipo === 'EMPRESA') {
      console.log('cambia de particular a empresa');
      this.options = 0;
    }
    if (this.arriendo.tipo_arriendo === 'REEMPLAZO' && selecionTipo === 'EMPRESA') {
      console.log('cambia de reemplazo a empresa');
      this.options = 0;
    }
    if (this.arriendo.tipo_arriendo === 'EMPRESA' && selecionTipo === 'PARTICULAR') {
      console.log('cambia de empresa a particular');
      this.options = 0;
    }
    if (this.arriendo.tipo_arriendo === 'EMPRESA' && selecionTipo === 'REEMPLAZO') {
      console.log('cambia de empresa a reemplazo');
      this.options = 0;
    }
  }

  send(): void {
    if (this.selectERemplazo == null && this.options === 1) {
      this.sendOptionER.emit(null);
      this.sendOptionTipo.emit(null);
      this.campoTipo = false;
      return;
    }
    if (this.options === 0 && this.options === null) {
      this.sendOptionER.emit(null);
      this.sendOptionTipo.emit(null);
      this.campoTipo = false;
      return;
    }
    this.sendOptionER.emit(this.selectERemplazo);
    this.sendOptionTipo.emit(this.options);
    this.campoTipo = true;
  }


}
