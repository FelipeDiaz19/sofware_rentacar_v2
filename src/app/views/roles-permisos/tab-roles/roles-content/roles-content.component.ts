import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roles-content',
  templateUrl: './roles-content.component.html',
  styleUrls: ['./roles-content.component.css']
})
export class RolesContentComponent implements OnInit {

  listTbody: String[] = [];
  listThead: String[] = [];

  constructor() { }

  ngOnInit(): void {
    this.listThead = ["hola mundo", "hola 2"]
    this.listTbody = ["hola mundo", "hola 2"]

  }

}
