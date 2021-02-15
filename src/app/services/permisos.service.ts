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


  getPermisosWithRol(id_rol): Observable<Permiso[]> {
    return this.http.get<RequestResponse>(`${environment.apiUrl}permisos/mostrarPermisosPorRol/${id_rol}`).pipe(map((response: RequestResponse) => {
      return this.permisos = response.data;
    }));
  }



}
