import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Arriendo, RequestResponse } from '../models';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArriendoService {

  arriendo: Arriendo;

  constructor(private http: HttpClient) { }



  findArriendo(ID: number): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${environment.apiUrl}arriendos/buscarArriendo/${ID}`);
  }

  finndAllArriendosPorSucursal(id: any): Observable<any> {
    return this.http.get<RequestResponse>(`${environment.apiUrl}arriendos/cargarArriendosPorSucursal/${id}`);
  }

  modificarTipo(ID: number, tipo: number, empresaRemplazo: string): Observable<RequestResponse> {
    return this.http.put<RequestResponse>(`${environment.apiUrl}arriendos/cambiarTipoArriendo/${ID}`, { tipo, empresaRemplazo });
  }

  modificarInfo(ID: number, arriendo: Arriendo): Observable<RequestResponse> {
    return this.http.put<RequestResponse>(`${environment.apiUrl}arriendos/editarArriendo/${ID}`, arriendo);
  }

  rollbackVistaFirma(ID: number): Observable<RequestResponse> {
    return this.http.delete<RequestResponse>(`${environment.apiUrl}utils/reiniciarVistaFirma/${ID}`);
  }

  rollbackVistaPago(ID: number): Observable<RequestResponse> {
    return this.http.delete<RequestResponse>(`${environment.apiUrl}utils/reiniciarVistaPago/${ID}`);
  }

  rollbackVistaRequisitos(ID: number): Observable<RequestResponse> {
    return this.http.delete<RequestResponse>(`${environment.apiUrl}utils/reiniciarVistaRequisito/${ID}`);
  }

}
