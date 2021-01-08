import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuarios'
import { environment } from 'src/environments/environment'
@Component({
  selector: 'app-auth',
  template: ' <br> <br> <br> <div class="text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div><h6>validando usuario...</h6></div>',
})
export class AuthComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.buscarUsuario();
  }

  buscarUsuario() {
    const { token } = this.route.snapshot.params;
    this.auth.login(token).subscribe((usuario: Usuario) => {
      this.usuario = usuario;
      this.router.navigate(["/home"]);
    }, (error) => {
      console.log("error en el componente auth");
     // window.location.href = `${environment.indexUrl}`;
    })
  }


}
