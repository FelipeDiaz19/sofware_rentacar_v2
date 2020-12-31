import { map } from 'rxjs/operators';
import { Vehiculo } from 'src/app/models';
import { Injectable } from '@angular/core';
import { RequestResponse } from '../models';
import { HttpClient, } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  vehiculos: Vehiculo[] = [];


  constructor(private http: HttpClient) { }


  getAll(): Observable<Vehiculo[]> {
    return this.http.get<RequestResponse>(`${environment.apiUrl}vehiculos/cargarTotalVehiculos`).pipe(map((response: RequestResponse) => {
      return this.vehiculos = response.data;
    }))
  }

}
