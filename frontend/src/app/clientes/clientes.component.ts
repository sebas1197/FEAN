import { Component } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  filtro: string = "";
  personas = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez' },
    { id: 2, nombre: 'María', apellido: 'Gómez' },
    { id: 3, nombre: 'Carlos', apellido: 'López' },
    // Agrega más personas si lo deseas
  ];

}
