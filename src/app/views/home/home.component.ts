import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.usuario = this.auth.getUsuario();
  }



}
