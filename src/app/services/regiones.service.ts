import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Region, RequestResponse } from '../models';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegionesService {

  regiones: Region[] = [];

  constructor(private http: HttpClient) { }

  getAll(): Observable<Region[]> {
    return this.http.get<RequestResponse>(`${environment.apiUrl}sucursales/cargarRegiones`).pipe(map((response: RequestResponse) => {
      return this.regiones = response.data;
    }))
  }
}
