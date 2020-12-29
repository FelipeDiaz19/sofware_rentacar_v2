import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Sucursal } from 'src/app/models/sucursales';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  sucursales: Sucursal[] = [];

  constructor(private http: HttpClient) {
  }


  getSucursales() {
    return this.http.get(`${environment.apiUrl}sucursales/cargarSucursales`).pipe(map((response: any) => {
      this.sucursales = response.data;
      return this.sucursales;
    }))
  }
}
