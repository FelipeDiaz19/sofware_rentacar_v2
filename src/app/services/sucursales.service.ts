import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Sucursal, RequestResponse } from 'src/app/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  sucursales: Sucursal[] = [];

  constructor(private http: HttpClient) {
  }


  getAll(): Observable<Sucursal[]> {
    return this.http.get<RequestResponse>(`${environment.apiUrl}sucursales/cargarSucursales`).pipe(map((response: RequestResponse) => {
      return this.sucursales = response.data;
    }));
  }
}
