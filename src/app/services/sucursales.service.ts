import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Sucursal, RequestResponse } from 'src/app/models';
import { Observable } from 'rxjs';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  sucursales: Sucursal[] = [];
  formOption: boolean;

  constructor(private http: HttpClient) { }


  getAll(): Observable<Sucursal[]> {
    return this.http.get<RequestResponse>(`${environment.apiUrl}sucursales/cargarSucursales`).pipe(map((response: RequestResponse) => {
      response.data.map((sucursal: any) => {
        sucursal.createdAt = moment(sucursal.createdAt).format("DD/MM/YYYY, h:mm:ss a");
      })
      return this.sucursales = response.data;
    }));
  }

  create(sucursal: Sucursal): Observable<RequestResponse> {
    return this.http.post<RequestResponse>(`${environment.apiUrl}sucursales/crearSucursal`, sucursal);
  }

  update(sucursal: Sucursal, id: number): Observable<RequestResponse> {
    return this.http.put<RequestResponse>(`${environment.apiUrl}sucursales/editarSucursal/${id}`, sucursal);
  }


}
