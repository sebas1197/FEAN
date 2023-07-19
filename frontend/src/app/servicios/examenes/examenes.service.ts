import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamenesService {

  api_url: string = "http://localhost:3000/examenes/"

  constructor(private http: HttpClient) { }

  getExamenes() {
    return this.http.get(this.api_url);
  }

  postExamen(registro: any) {
    return this.http.post(this.api_url, registro);
  }

  putExamen(registro: any) {
    return this.http.put(this.api_url + registro.id, registro);
  }

  deleteExamen(id: any) {
    return this.http.delete(this.api_url + id);
  }
}
