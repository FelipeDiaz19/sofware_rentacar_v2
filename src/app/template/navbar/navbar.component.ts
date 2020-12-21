import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { Usuario } from 'src/app/models/usuarios';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.usuario.nombre_usuario = "nombre de usuario";
  }

  mostrarNombre(nombre: string) {
    console.log(nombre)
    this.usuario.nombre_usuario = nombre;
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
