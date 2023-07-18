import { Component } from '@angular/core';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent {
  filtro: string = "";
  personas = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez' },
    { id: 2, nombre: 'María', apellido: 'Gómez' },
    { id: 3, nombre: 'Carlos', apellido: 'López' },
    // Agrega más personas si lo deseas
  ];
}
