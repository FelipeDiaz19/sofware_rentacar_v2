import { AlertHelper } from './../../../../helpers/alert.helper';
import { RequestResponse } from './../../../../models/requestResponse';
import { Permiso } from './../../../../models/permisos';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PermisosService } from 'src/app/services/permisos.service';

@Component({
  selector: 'app-permisos-content',
  templateUrl: './permisos-content.component.html',
  styleUrls: ['./permisos-content.component.css']
})
export class PermisosContentComponent implements OnInit {

  constructor(private _permisoService: PermisosService, private alert: AlertHelper) { }

  permiso: Permiso = new Permiso();
  listPermisoThead: string[] = [];
  permisos: Permiso[] = [];

  ngOnInit(): void {
    this.cargarPermisos();
  }


  cargarPermisos(): void {
    this._permisoService.getAll().subscribe((permisos: Permiso[]) => {
      this.permisos = permisos;
      this.listPermisoThead = ['Codigo', 'Titulo', 'Descripcion', ''];
    });
  }


  registrarPermiso(FORM: NgForm): void {
    if (FORM.invalid) {
      Object.values(FORM.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }
    this.permiso = FORM.value;
    this._permisoService.createPermiso(this.permiso).subscribe((response: RequestResponse) => {
      console.log(response);
      this.alert.createAlert(response.msg)
      FORM.reset();
      this.cargarPermisos();
    });
  }

}
