import { Component, Input, OnInit } from '@angular/core';
import { Arriendo } from 'src/app/models';

@Component({
  selector: 'app-arriendo-cliente',
  templateUrl: './arriendo-cliente.component.html',
  styleUrls: ['./arriendo-cliente.component.css']
})
export class ArriendoClienteComponent implements OnInit {

  @Input() arriendo: Arriendo = new Arriendo();

  constructor() { }

  ngOnInit(): void {


  }

}
