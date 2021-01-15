import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Accesorio, RequestResponse } from '../models';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccesoriosService {
  formatter = new Intl.NumberFormat('CL');
  accesorio: Accesorio;
  accesorios: Accesorio[] = [];

  constructor(private http: HttpClient) {

  }


  create(ACCESORIO: Accesorio): Observable<RequestResponse> {
    return this.http.post<RequestResponse>(`${environment.apiUrl}accesorios/registrarAccesorio`, ACCESORIO);
  }

  put(ACCESORIO: Accesorio, ID: number): Observable<RequestResponse> {
    return this.http.put<RequestResponse>(`${environment.apiUrl}accesorios/editarAccesorio/${ID}`, ACCESORIO);
  }


  getOne(ID: number): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${environment.apiUrl}accesorios/buscarAccesorio/${ID}`);
  }



  getAll(): Observable<Accesorio[]> {
    return this.http.get<RequestResponse>(`${environment.apiUrl}accesorios/cargarAccesorios`).pipe(map((response: RequestResponse) => {
      response.data.map((accesorio: any) => {
        accesorio.createdAt = moment(accesorio.createdAt).format('DD/MM/YYYY, h:mm:ss a');
        accesorio.iva_accesorio = '$ ' + this.formatter.format(this.calcularIva(accesorio.precio_accesorio));
        accesorio.total_accesorio = '$ ' + this.formatter.format(this.calcularBruto(accesorio.precio_accesorio));
        accesorio.precio_accesorio = '$ ' + this.formatter.format(accesorio.precio_accesorio);
      });
      return this.accesorio = response.data;
    }));
  }

  private calcularIva(NETO: number): number {
    return NETO * 0.19;
  }

  private calcularBruto(NETO: number): number {
    return NETO + NETO * 0.19;
  }




}
