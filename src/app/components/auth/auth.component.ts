import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuarios'
import { environment } from 'src/environments/environment'
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.buscarUsuario();
  }

  buscarUsuario() {
    const { id, token } = this.route.snapshot.params;
    this.auth.login(id, token).subscribe((usuario: Usuario) => {
      this.usuario = usuario;
      this.router.navigate(["/home"]);
    }, (error) => {
      window.location.href = `${environment.indexUrl}`;
    })
  }


}
