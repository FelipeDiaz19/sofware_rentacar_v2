import { map } from 'rxjs/operators';
import { RequestResponse } from './../models/requestResponse';
import { Permiso } from './../models/permisos';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  permisos: Permiso[] = [];

  constructor(private http: HttpClient) { }


  getPermisosWithRol(idRol: number): Observable<Permiso[]> {
    return this.http.get<RequestResponse>(`${environment.apiUrl}permisos/mostrarPermisosPorRol/${idRol}`)
      .pipe(map((response: RequestResponse) => (this.permisos = response.data)));
  }


  getAll(): Observable<Permiso[]> {
    return this.http.get<RequestResponse>(`${environment.apiUrl}permisos/cargarPermisos`).pipe(map((response: RequestResponse) => {
      return this.permisos = response.data;
    }));
  }

  createRolPermiso(idRol: number, idPermiso: number): Observable<RequestResponse> {
    return this.http.post<RequestResponse>(`${environment.apiUrl}permisos/crearRolPermiso`, { id_rol: idRol, id_permiso: idPermiso });
  }

  deteleRolPermiso(idRolPermiso: number): Observable<RequestResponse> {
    return this.http.delete<RequestResponse>(`${environment.apiUrl}permisos/eliminarRolPermiso/${idRolPermiso}`);
  }


  createPermiso(permiso: Permiso): Observable<RequestResponse> {
    return this.http.post<RequestResponse>(`${environment.apiUrl}permisos/registrarPermiso`, permiso);
  }


}
