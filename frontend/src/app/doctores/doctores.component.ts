import { Component } from '@angular/core';
import { DoctoresService } from '../servicios/doctores/doctores.service';

@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.css']
})
export class DoctoresComponent {

  registros: any[] = [];
  resultadosBusqueda: any[] = [];
  filtro: string = "";
  showModal: boolean = false;
  EDICION: boolean = false;
  terminoBusqueda: string = "";

  doctor: any = {
    clave: "",
    apellido: "",
    nombre: "",
    cedula: ""
  }

  constructor(private doctoresServices: DoctoresService){
    this.registros = [];
    this.listar();
  }

  listar(){
    this.registros = [];
    this.doctoresServices.getDoctores().subscribe((data: any) => {
      data.forEach((element: any) => {
        this.registros.push(element);
      }
      );
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.EDICION = false;
  }

  guardar() {
    this.doctoresServices.postDoctor(this.doctor).subscribe((data: any) => {
      this.registros.push(data);
    });
    this.closeModal();
    this.listar();
  }

  editModal(registro: any){
    this.EDICION = true;
    this.doctor = registro;
    this.openModal();
  }

  editar() {
    this.doctoresServices.putDoctor(this.doctor).subscribe((data: any) => {
      this.registros.forEach((element: any) => {
        if (element.id == this.doctor.id) {
          element.clave = this.doctor.clave;
          element.apellido = this.doctor.apellido;
          element.nombre = this.doctor.nombre;
          element.cédula = this.doctor.cédula;  
        }
      });
    });
    this.closeModal();
    this.listar();
  }

  eliminar(registro: any){
    this.doctoresServices.deleteDoctor(registro.id).subscribe((data: any) => {
      this.registros.forEach((element: any, index: any) => {
        if (element.id == registro.id) {
          this.registros.splice(index, 1);
        }
      });
    });
    this.listar();
  }  

  buscar(termino: string) {   
    if(termino.length === 0){
      this.listar();
    }else{
      this.registros = this.registros.filter(dato => {
        return dato.cedula.includes(termino.toLowerCase())
      });
    }
  }
    
}
