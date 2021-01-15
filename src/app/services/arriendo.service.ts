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

  modificarTipo(ID: number, tipo: number, empresaRemplazo: string): Observable<RequestResponse> {
    return this.http.post<RequestResponse>(`${environment.apiUrl}arriendos/cambiarTipoArriendo`, { ID, tipo, empresaRemplazo });
  }

  modificarInfo(arriendo: Arriendo): Observable<RequestResponse> {
    return this.http.post<RequestResponse>(`${environment.apiUrl})arriendos/editarArriendo`, arriendo);
  }

  rollbackVistaFirma(ID: number): Observable<RequestResponse> {
    return this.http.delete<RequestResponse>(`${environment.apiUrl}arriendos/reiniciarVistaFirma/${ID}`);
  }

  rollbackVistaPago(ID: number): Observable<RequestResponse> {
    return this.http.delete<RequestResponse>(`${environment.apiUrl}arriendos/reiniciarVistaPago/${ID}`);

  }

  rollbackVistarequisitos(ID: number): Observable<RequestResponse> {
    return this.http.delete<RequestResponse>(`${environment.apiUrl}arriendos/reiniciarVistaRequisito/${ID}`);

  }

}
