import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  api_url: string = "http://localhost:3000/clientes/"
  api_url_pacientes: string = "http://localhost:3000/pacientes/"

  constructor(private http: HttpClient) { }

  getClientes() {
    return this.http.get(this.api_url);
  }

  getCliente(id: any) {
    return this.http.get(this.api_url_pacientes + id);
  }

  postCliente(registro: any) {
    return this.http.post(this.api_url, registro);
  }

  putCliente(registro: any) {
    return this.http.put(this.api_url + registro.id, registro);
  }

  deleteCliente(id: any) {
    return this.http.delete(this.api_url + id);
  }
}
