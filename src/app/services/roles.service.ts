import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RequestResponse, Rol } from 'src/app/models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  roles: Rol[] = [];

  constructor(private http: HttpClient) { }


  getAll(): Observable<Rol[]> {
    return this.http.get<RequestResponse>(`${environment.apiUrl}permisos/cargarRoles`).pipe(map((response: RequestResponse) => {
      return this.roles = response.data;
    }));
  }

  create(rol: Rol): Observable<RequestResponse> {
    return this.http.post<RequestResponse>(`${environment.apiUrl}permisos/registrarRol`, rol);
  }



}
