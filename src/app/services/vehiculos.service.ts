import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { RequestResponse } from '../models';
import { HttpClient, } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {


  constructor(private http: HttpClient, private _auth: AuthService) { }


  getVehiculos(): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${environment.apiUrl}vehiculos/cargarTotalVehiculos`);
  }

  /*  getVehiculos():Observable<Vehiculo> {
     return this.http.get<RequestResponse>(`${environment.apiUrl}vehiculos/cargarVehiculos`).pipe(map((response: RequestResponse) => {
       return this.vehiculos = response.data;
     }))
   } */

}
