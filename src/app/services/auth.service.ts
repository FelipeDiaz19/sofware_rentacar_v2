import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuarios';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken: string;
  usuario: Usuario = new Usuario();


  constructor(private http: HttpClient) {

    this.estadoSesion();
  }

  login(ID: string, TOKEN: string) {
    const headers = new HttpHeaders({ "usertoken": TOKEN });
    return this.http.get(`${environment.apiUrl}usuarios/buscarUsuario/${ID}`, { headers }).pipe(map((response: any) => {
      this.usuario = response.data;
      this.guardarSesion(TOKEN, this.usuario);
      return this.usuario;
    }))
  }

  private guardarSesion(TOKEN: string, USUARIO: Usuario) {
    this.userToken = TOKEN;
    localStorage.setItem('usuario', JSON.stringify(USUARIO));
    localStorage.setItem("usertoken", TOKEN);
  }

  estadoSesion(): boolean {
    if (localStorage.getItem('usertoken') && localStorage.getItem('usuario')) {
      this.userToken = localStorage.getItem('usertoken');
      return true;
    } else {
      this.userToken = '';
      return false;
    }
  }

  cerrarSesion() {
    localStorage.removeItem("usertoken");
    localStorage.removeItem("usuario");
  }

  getUsuario(): Usuario {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    return this.usuario;
  }



}
