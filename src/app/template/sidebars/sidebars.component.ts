import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebars',
  templateUrl: './sidebars.component.html',
  styleUrls: ['./sidebars.component.css']
})
export class SidebarsComponent implements OnInit {

  constructor(public _auth: AuthService) {

  }

  ngOnInit(): void {
    if (this._auth.estadoSesion()) {
      this._auth.validarPermiso();
    }
  }



}
