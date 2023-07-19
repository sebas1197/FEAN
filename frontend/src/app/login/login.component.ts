import { Component } from '@angular/core';
import { DoctoresService } from '../servicios/doctores/doctores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  cedula: string = "";
  clave: string = "";

  constructor( private doctoresServices: DoctoresService ){
  }

  login() {
    this.doctoresServices.getDoctores().subscribe((data: any) => {
      data.forEach((element: any) => {
        if(element.cedula == this.cedula && element.clave == this.clave){
          window.location.href = "/doctores";
          Swal.fire(
            'Bienvenido',
            '',
            'success'
          )
        }else{
          Swal.fire(
            'Usuario o contraseña incorrectos',
            '',
            'error'
          )
        }

      });
    });
    
  }
}
