import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles-permisos-header',
  templateUrl: './roles-permisos-header.component.html',
  styleUrls: ['./roles-permisos-header.component.css']
})
export class RolesPermisosHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navergar(URL: string) {
    this.router.navigate([URL])
  }

}
