import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuarios';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario: Observable<Usuario>;


  constructor(private http: HttpClient) {

  }

  validationAuth(ID: string, TOKEN: string) {
    const headers = new HttpHeaders({ "usertoken": "xzxs" });
    return this.http.get(`${environment.apiUrl}usuarios/buscarUsuario/${ID}`, { headers }).pipe(map((response: any) => {
      const usuario = response.data;
      usuario.usertoken = TOKEN;
      localStorage.setItem("user", usuario);
      return usuario;
    }))
  }


}
