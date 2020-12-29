import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.auth.userToken;
    const userName = this.auth.usuario.nombre_usuario;
    if (token && userName) {
      request = request.clone({
        setHeaders: {
          "usertoken": token, "userat": userName
        },
      })
    }
    return next.handle(request);
  }
}
