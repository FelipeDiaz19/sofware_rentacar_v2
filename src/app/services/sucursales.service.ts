import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Sucursal } from 'src/app/models/sucursales';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  sucursales: Sucursal[];
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ "usertoken": localStorage.getItem('usertoken') });
  }


  getSucursales() {
    return this.http.get(`${environment.apiUrl}sucursales/cargarSucursales`, { headers: this.headers }).pipe(map((response: any) => {
      this.sucursales = response.data;
      return this.sucursales;
    }))
  }
}
