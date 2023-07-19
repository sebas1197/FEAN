import { Component } from '@angular/core';
import { ClientesService } from '../servicios/clientes/clientes.service';
import { ExamenesService } from '../servicios/examenes/examenes.service';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import Swal from 'sweetalert2';
import * as QRCode from 'qrcode';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})


export class PacientesComponent {

  registros: any[] = [];
  examenes: any[] = [];
  resultadosBusqueda: any[] = [];
  filtro: string = "";
  showModal: boolean = false;
  terminoBusqueda: string = "";
  QR: boolean = false;

  cliente: any = {
    correo: "",
    apellido: "",
    nombre: "",
    cedula: ""
  }

  examen: any = {
    doctor: "",
    fecha: "",
    resultado: ""
  }

  constructor(private clientesServices: ClientesService, private examenesServices: ExamenesService) { 
    this.registros = [];
    this.examenes = [];
    this.listar();
    
    this.qr();
  }

  listar(){
    this.registros = [];
    this.clientesServices.getClientes().subscribe((data: any) => {
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
  }
  

  buscar(termino: string) {   
    this.cliente = {};
    this.examenes = [];

    this.registros.filter(dato => {
      if(dato.cedula.includes(termino.toLowerCase())){
        this.cliente = dato;
        this.listarExamenes();
      }else{
        Swal.fire(
          'Paciente no encontrado',
          '',
          'error'
        )
      }
    });

  }

  listarExamenes(){
    this.examenesServices.getExamenes().subscribe((data: any) => {
      data.forEach((element: any) => {
        if(element.cliente == this.cliente.cedula){
          this.examenes.push(element); 
        }
      });
    });
  }
  

  generarPDF(registro: any){

    const canvas = document.createElement('canvas');

    const options = {
      allowEmptyString: 'allowEmptyString',
    };
    

    const id = 'http://localhost:4200/pacientes/' + this.cliente.id;
    QRCode.toCanvas(canvas, id, { width: 200 }, (error) => {
      if (error) {
        console.error('Error al generar el código QR:', error);
        return;
      }
    });

    const documentDefinition = {
      content: [
        {
          image: 'data:image/jpeg;base64,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',
          width: 200,
          height: 200,
        },
        'Cliente: ' + this.cliente.nombre + ' ' + this.cliente.apellido,
        'Cédula: ' + this.cliente.cedula,
        'Correo: ' + this.cliente.correo,
        'Historial médico',
        'Fecha: ' + registro.fecha,
        'Doctor: ' + registro.doctor,
        'Resultado: ' + registro.resultado,
        ' ',
        ' ',
        {
          image: canvas.toDataURL(),
          width: 200,
          height: 200
        }
      ]
    };

    pdfMake.createPdf(documentDefinition).download(this.cliente.nombre + '.pdf');

  }

  qr(){
    const parametros = window.location.href.split('/')[4];

    if (parametros != undefined) {
      this.clientesServices.getCliente(parametros).subscribe((data: any) => {
        this.cliente = data;
        this.listarExamenes();
        this.QR = true;
      });      
    }else{
      this.QR = false;
    }
  }

}
