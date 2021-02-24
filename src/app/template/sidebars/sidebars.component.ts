import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebars',
  templateUrl: './sidebars.component.html',
  styleUrls: ['./sidebars.component.css']
})
export class SidebarsComponent implements OnInit {


  modulo1: Boolean = false;
  modulo2: Boolean = false;
  modulo3: Boolean = false;
  modulo4: Boolean = false;
  modulo5: Boolean = false;
  modulo6: Boolean = false;


  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.validarPermiso()
  }

  validarPermiso() {
    this.auth.validarPermiso().subscribe((data: []) => {
      data.forEach(id => {
        switch (true) {
          case (id == 21):
            this.modulo1 = true;
            break;
          case (id == 22):
            this.modulo2 = true;
            break;
          case (id == 23):
            this.modulo3 = true;
            break;
          case (id == 24):
            this.modulo4 = true;
            break;
          case (id == 25):
            this.modulo5 = true;
            break;
          case (id == 26):
            this.modulo6 = true;
            break;
        }
      })
    })
  }

}
