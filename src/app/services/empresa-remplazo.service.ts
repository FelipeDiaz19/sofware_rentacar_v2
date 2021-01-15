import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EmpresaRemplazo, RequestResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EmpresaRemplazoService {

  empresasRemplazos: EmpresaRemplazo[] = [];

  constructor(private http: HttpClient) { }


  getAll(): Observable<EmpresaRemplazo[]> {
    return this.http.get(`${environment.apiUrl}empresasRemplazo/cargarEmpresasRemplazo`).pipe(map((response: RequestResponse) => {
      return this.empresasRemplazos = response.data;
    }));
  }


}
