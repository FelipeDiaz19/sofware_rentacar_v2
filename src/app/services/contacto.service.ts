import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contacto, RequestResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private http: HttpClient) { }


  modificarContacto(ID: number, contacto: Contacto): Observable<RequestResponse> {
    return this.http.put<RequestResponse>(`${environment.apiUrl}arriendos/editarContacto/${ID}`, contacto);
  }

}
