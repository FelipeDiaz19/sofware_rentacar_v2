import { Permiso } from './../../../../models/permisos';
import { Rol } from './../../../../models/roles';
import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/services/roles.service';
import { AlertHelper } from 'src/app/helpers/alert.helper';
import { NgForm } from '@angular/forms';
import { PermisosService } from 'src/app/services/permisos.service';
@Component({
  selector: 'app-roles-content',
  templateUrl: './roles-content.component.html',
  styleUrls: ['./roles-content.component.css']
})
export class RolesContentComponent implements OnInit {


  listRolThead: string[] = [];
  listPermisoThead: string[] = [];

  roles: Rol[] = [];
  permisos: Permiso[] = [];
  rol: Rol = new Rol();

  constructor(private _rol: RolesService, private _permiso: PermisosService, private alert: AlertHelper) {
    this.listRolThead = ['ID', 'Nombre', 'Usuarios', ''];
  }



  ngOnInit(): void {
    this.mostrarRoles();
  }



  mostrarRoles(): void {
    this._rol.getAll().subscribe((roles: Rol[]) => {
      this.roles = roles;
    });
  }



  mostrarPermisos(id: number, nombre: string): void {
    this._permiso.getPermisosWithRol(id).subscribe((permisos: Permiso[]) => {
      this.permisos = permisos;
      if (this.permisos.length > 0) {
        this.listPermisoThead = ['ID', 'Titulo', 'Descripcion', ''];
      } else {
        this.listPermisoThead.length = 0;
      }
    });
  }



  registrarRol(FORM: NgForm): void {
    if (FORM.invalid) {
      Object.values(FORM.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }
    this.rol = FORM.value;
    this._rol.create(this.rol).subscribe(data => {
      if (data.success) {
        this.alert.createAlert('nuevo rol registrado!');
        this.mostrarRoles();
        FORM.reset();
      }
    });
  }



}
