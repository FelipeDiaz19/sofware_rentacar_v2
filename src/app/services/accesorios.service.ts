import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Accesorio, RequestResponse } from '../models';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { Observable } from 'rxjs';
//import 'moment/locale/es';


@Injectable({
  providedIn: 'root'
})
export class AccesoriosService {

  accesorio: Accesorio;
  accesorios: Accesorio[] = [];

  constructor(private http: HttpClient) {

  }


  create(ACCESORIO: Accesorio): Observable<RequestResponse> {
    return this.http.post<RequestResponse>(`${environment.apiUrl}accesorios/registrarAccesorio`, ACCESORIO);
  }



  getAll(): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${environment.apiUrl}accesorios/cargarAccesorios`);
  }


  getOne(ID: Number): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${environment.apiUrl}accesorios/buscarAccesorio/${ID}`);
  }


  put(ACCESORIO: Accesorio, ID: Number): Observable<RequestResponse> {
    return this.http.put<RequestResponse>(`${environment.apiUrl}accesorios/editarAccesorio/${ID}`, ACCESORIO);
  }




}
