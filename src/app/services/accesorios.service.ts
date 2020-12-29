import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Accesorio } from '../models/accesorios';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
//import 'moment/locale/es';


@Injectable({
  providedIn: 'root'
})
export class AccesoriosService {

  accesorio: Accesorio;
  accesorios: Accesorio[] = [];

  constructor(private http: HttpClient) {

  }


  create(ACCESORIO: Accesorio) {
    return this.http.post(`${environment.apiUrl}accesorios/registrarAccesorio`, ACCESORIO)
  }


  getAll() {
    return this.http.get(`${environment.apiUrl}accesorios/cargarAccesorios`).pipe(map((response: any) => {
      response.data.map(item => {
        item.createdAt = moment(item.createdAt).format("DD/MM/YYYY, h:mm:ss a");
      })
      this.accesorios = response.data;
      return this.accesorios;
    }));
  }


  getOne(ID: Number) {
    return this.http.get(`${environment.apiUrl}accesorios/buscarAccesorio/${ID}`);
  }


  put(ACCESORIO: Accesorio, ID: Number) {
    return this.http.put(`${environment.apiUrl}accesorios/editarAccesorio/${ID}`, ACCESORIO);
  }




}
