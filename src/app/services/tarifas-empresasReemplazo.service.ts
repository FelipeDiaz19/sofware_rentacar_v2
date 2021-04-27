import { map } from 'rxjs/operators';
import { TarifasEmpresasReemplazo, RequestResponse } from '../models';
import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarifasEmpresasReemplazoService {

  tarifas: TarifasEmpresasReemplazo[] = [];


  constructor(private http: HttpClient) { }

    UpdateTarifa(ID: string, DATA): Observable<RequestResponse> {
    return this.http.put<RequestResponse>(`${environment.apiUrl}empresasRemplazo/updateTarifasPorEmpresa/${ID}`, DATA);
  }


  getAll(): Observable<TarifasEmpresasReemplazo[]> {
    return this.http.get<RequestResponse>(`${environment.apiUrl}empresasRemplazo/getAllTarifasEmpresaReemplazo`).pipe(map((response: RequestResponse) => {
      return this.tarifas = response.data;
    }));
  }

    create(DATA: TarifasEmpresasReemplazo): Observable<RequestResponse> {
    return this.http.post<RequestResponse>(`${environment.apiUrl}empresasRemplazo/crearTarifaEmpresaReemplazo`, DATA);
  }


    getAllPorEmpresaReemplazo(ID: string): Observable<TarifasEmpresasReemplazo[]> {
    return this.http.get<RequestResponse>(`${environment.apiUrl}empresasRemplazo/getAllTarifasPorEmpresa/${ID}`).pipe(map((response: RequestResponse) => {
      return this.tarifas = response.data;
    }));
  }






}
