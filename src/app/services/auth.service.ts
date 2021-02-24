import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario, RequestResponse } from '../models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken: string;
  usuario: Usuario = new Usuario();
  existe: boolean = false;

  constructor(private http: HttpClient) {
    this.usuario.nombre_usuario = "cargando..."
    this.estadoSesion();
  }

  public login(TOKEN: string): Observable<Usuario> {
    localStorage.removeItem("usertoken");
    localStorage.removeItem("usuario");
    const headers = new HttpHeaders({ "usertoken": TOKEN });
    return this.http.get<RequestResponse>(`${environment.apiUrl}usuarios/validarUsuario/${TOKEN}`, { headers }).pipe(map((response: RequestResponse) => {
      this.usuario = response.data;
      this.guardarSesion(TOKEN, this.usuario);
      return this.usuario;
    }))
  }

  public validarPermiso(): Observable<[]> {
    return this.http.get<[]>(`${environment.apiUrl}permisos/validarPermisos/${this.usuario.id_rol}`);
  }


  public getUsuario(): Usuario {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    return this.usuario;
  }

  public estadoSesion(): boolean {
    if (localStorage.getItem('usertoken') && localStorage.getItem('usuario')) {
      this.userToken = localStorage.getItem('usertoken');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      return true;
    } else {
      this.userToken = '';
      return false;
    }
  }

  public cerrarSesion(): void {
    localStorage.removeItem("usertoken");
    localStorage.removeItem("usuario");
    window.location.href = `${environment.indexUrl}`;
  }

  private guardarSesion(TOKEN: string, USUARIO: Usuario): void {
    this.userToken = TOKEN;
    localStorage.setItem('usuario', JSON.stringify(USUARIO));
    localStorage.setItem("usertoken", TOKEN);
  }



}
