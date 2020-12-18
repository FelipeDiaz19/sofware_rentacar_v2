import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.validarUsuario();
  }

  validarUsuario() {
    const { id, token } = this.route.snapshot.params;
    this.auth.validationAuth(id, token).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(["/home"]);
    }, (error) => {
      this.irInicio();
    })
  }

  irInicio() {
    //this.router.navigateByUrl(environment.indexUrl);

  }


}
