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

  // modulos disponibles
  modulo1: boolean = false;
  modulo2: boolean = false;
  modulo3: boolean = false;
  modulo4: boolean = false;
  modulo5: boolean = false;
  modulo6: boolean = false;



  constructor(private http: HttpClient) {
    this.usuario.nombre_usuario = 'cargando...';
    this.estadoSesion();
  }

  public login(TOKEN: string): Observable<Usuario> {
    localStorage.removeItem('usertoken');
    localStorage.removeItem('usuario');
    const headers = new HttpHeaders({ usertoken: TOKEN });
    return this.http.get<RequestResponse>(`${environment.apiUrl}usuarios/validarUsuario/${TOKEN}`, { headers })
      .pipe(map((response: RequestResponse) => {
        this.usuario = response.data;
        this.guardarSesion(TOKEN, this.usuario);
        return this.usuario;
      }));
  }

  public validarPermiso(): void {
    this.http.get(`${environment.apiUrl}permisos/validarPermisos/${this.usuario.id_rol}`).subscribe((data: []) => {
      data.forEach(id => {
        switch (true) {
          case (id === 21):
            this.modulo1 = true;
            localStorage.setItem('modulo1', 'true');
            break;
          case (id === 22):
            this.modulo2 = true;
            localStorage.setItem('modulo2', 'true');
            break;
          case (id === 23):
            this.modulo3 = true;
            localStorage.setItem('modulo3', 'true');
            break;
          case (id === 24):
            this.modulo4 = true;
            localStorage.setItem('modulo4', 'true');
            break;
          case (id === 25):
            this.modulo5 = true;
            localStorage.setItem('modulo5', 'true');
            break;
          case (id === 26):
            this.modulo6 = true;
            localStorage.setItem('modulo6', 'true');
            break;
        }
      });
    });
  }


  public getUsuario(): Usuario {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    return this.usuario;
  }

  public estadoSesion(): boolean {
    if (localStorage.getItem('usertoken') && localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.userToken = localStorage.getItem('usertoken');
      this.modulo1 = JSON.parse(localStorage.getItem('modulo1'));
      this.modulo2 = JSON.parse(localStorage.getItem('modulo2'));
      this.modulo3 = JSON.parse(localStorage.getItem('modulo3'));
      this.modulo4 = JSON.parse(localStorage.getItem('modulo4'));
      this.modulo5 = JSON.parse(localStorage.getItem('modulo5'));
      this.modulo6 = JSON.parse(localStorage.getItem('modulo6'));
      return true;
    } else {
      this.userToken = '';
      return false;
    }
  }

  public cerrarSesion(): void {
    localStorage.removeItem('usertoken');
    localStorage.removeItem('usuario');

    localStorage.removeItem('modulo1');
    localStorage.removeItem('modulo2');
    localStorage.removeItem('modulo3');
    localStorage.removeItem('modulo4');
    localStorage.removeItem('modulo5');
    localStorage.removeItem('modulo6');

    window.location.href = `${environment.indexUrl}`;
  }

  private guardarSesion(TOKEN: string, USUARIO: Usuario): void {
    this.userToken = TOKEN;
    localStorage.setItem('usuario', JSON.stringify(USUARIO));
    localStorage.setItem('usertoken', TOKEN);
  }



}
