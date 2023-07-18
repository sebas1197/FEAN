import { Component } from '@angular/core';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css']
})
export class ExamenesComponent {
  filtro: string = "";
  personas = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez' },
    { id: 2, nombre: 'María', apellido: 'Gómez' },
    { id: 3, nombre: 'Carlos', apellido: 'López' },
    // Agrega más personas si lo deseas
  ];

}
