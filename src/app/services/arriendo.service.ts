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

}
