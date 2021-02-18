import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @ViewChild('modal') element: ElementRef;
  @Input() tituloModal: string;


  constructor() { }

  ngOnInit(): void {
  }


  public showModal(): void {
    console.log(this.element);
  }
}
