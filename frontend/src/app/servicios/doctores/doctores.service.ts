import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DoctoresService {

  api_url: string = "http://localhost:3000/doctores/"

  constructor(private http: HttpClient) { }

  getDoctores() {
    return this.http.get(this.api_url);
  }

  postDoctor(doctor: any) {
    return this.http.post(this.api_url, doctor);
  }

  putDoctor(doctor: any) {
    return this.http.put(this.api_url + doctor.id, doctor);
  }

  deleteDoctor(id: any) {
    return this.http.delete(this.api_url + id);
  }
}
