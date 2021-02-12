import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  @Input() listThead: String[] = [];
  @Input() listTbody: String[] = [];



  constructor() {

  }

  ngOnInit(): void {

  }

}
