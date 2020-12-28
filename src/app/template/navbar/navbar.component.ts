import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {

  }



  salir() {
    this.auth.cerrarSesion();
    window.location.href = `${environment.indexUrl}`;
  }

  irPerfil() {
    window.location.href = `${environment.indexUrl}index.php/modulos_gestion?modulo=0`
  }

  irModuloAtencion() {
    window.location.href = `${environment.indexUrl}index.php/cargar_panel?panel=2`;
  }

  irModuloGestion() {
    window.location.href = `${environment.indexUrl}index.php/cargar_panel?panel=1`
  }



}
