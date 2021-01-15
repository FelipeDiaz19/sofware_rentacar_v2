import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contacto } from 'src/app/models';

@Component({
  selector: 'app-arriendo-contacto',
  templateUrl: './arriendo-contacto.component.html',
  styleUrls: ['./arriendo-contacto.component.css']
})
export class ArriendoContactoComponent implements OnInit {

  @Input() contacto: Contacto = new Contacto();
  @Output() sendForm = new EventEmitter<FormGroup>();
  form: FormGroup;



  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.generarFormulario();
  }

  generarFormulario(): void {
    this.form = this.fb.group({
      nombre_contacto: [this.contacto.nombre_contacto, Validators.required],
      domicilio_contacto: [this.contacto.domicilio_contacto, Validators.required],
      numeroCasa_contacto: [this.contacto.numeroCasa_contacto, Validators.required],
      ciudad_contacto: [this.contacto.ciudad_contacto, Validators.required],
      telefono_contacto: [this.contacto.telefono_contacto, Validators.required],
    });
  }

  validarCampos(nombre: string): boolean {
    return this.form.get(nombre).invalid && this.form.get(nombre).touched;
  }

  onChange(): void {
    this.sendForm.emit(this.form);
  }

}
