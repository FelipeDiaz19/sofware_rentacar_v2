import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { AlertHelper } from './alert.helper';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private _auth: AuthService, private alert: AlertHelper) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((err) => {
      if (err.status === 320) {
        //errores del token
        this._auth.cerrarSesion();
        return;
      }

      if (!err.error.success) {
        //errores en las consultas
        this.alert.errorAlert(err.error.msg);
      }


      const error = err.error.msg || err.status;
      return throwError(error);
    }))
  }
}
