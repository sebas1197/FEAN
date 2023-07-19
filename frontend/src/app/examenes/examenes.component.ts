import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ExamenesService } from '../servicios/examenes/examenes.service';
import { ClientesService } from '../servicios/clientes/clientes.service';
import { DoctoresService } from '../servicios/doctores/doctores.service';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css']
})
export class ExamenesComponent {

  registros: any[] = [];
  resultadosBusqueda: any[] = [];
  filtro: string = "";
  showModal: boolean = false;
  EDICION: boolean = false;
  terminoBusqueda: string = "";
  filtoFecha: string = "";

  examen: any = {
    cliente: "",
    doctor: "",
    fecha: "",
    resultado: ""
  }

  clientes: string[] = [];
  doctores: string[] = [];

  constructor(private examenesServices: ExamenesService,
              private clientesServices: ClientesService,
              private doctoresServices: DoctoresService)  { 
    this.registros = [];
    this.listar();
  }

  listar(){
    this.registros = [];
    this.examenesServices.getExamenes().subscribe((data: any) => {
      data.forEach((element: any) => {
        this.registros.push(element);
      }
      );
    });
  }

  listarClientes(){
    this.clientes = [];
    this.clientesServices.getClientes().subscribe((data: any) => {
      data.forEach((element: any) => {
        this.clientes.push(element.cedula);
      }
      );
    });
  }

  listarDoctores(){
    this.doctores = [];
    this.doctoresServices.getDoctores().subscribe((data: any) => {
      data.forEach((element: any) => {
        this.doctores.push(element.cedula);
      }
      );
    });
  }

  openModal() {
    this.showModal = true;
    this.examen = {}
    this.listarClientes();
    this.listarDoctores();
  }

  closeModal() {
    this.showModal = false;
    this.EDICION = false;
    this.listar();
  }

  guardar() {
    this.examenesServices.postExamen(this.examen).subscribe((data: any) => {
      this.closeModal();
      Swal.fire(
        'Registro guardado',
        '',
        'success'
      )
    });
    this.listar();
  }

  editModal(registro: any){
    this.EDICION = true;
    this.examen = registro;
    this.openModal();
  }

  editar() {
    this.examenesServices.putExamen(this.examen).subscribe((data: any) => {
      this.registros.forEach((element: any) => {
        if(element.id == this.examen.id){
          element.cliente = this.examen.cliente;
          element.doctor = this.examen.doctor;
          element.fecha = this.examen.fecha;
          element.resultado = this.examen.resultado;
        }
      });
      window.location.reload();
    });
    this.closeModal();
    Swal.fire(
      'Registro actualizado',
      '',
      'success'
    )
    this.listar();
  }

  eliminar(registro: any){
    this.examenesServices.deleteExamen(registro.id).subscribe((data: any) => {
      Swal.fire(
        'Registro eliminado',
        '',
        'success'
      )  
    });
    
    this.listar();
  }  

  filtrarPorFecha(){
    this.resultadosBusqueda = [];
    this.registros.forEach((element: any) => {
      if(element.fecha == this.filtoFecha){
        this.resultadosBusqueda.push(element);
      }
    });
    this.registros = []
    this.registros = this.resultadosBusqueda;
  }

}
