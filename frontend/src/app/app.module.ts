import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FilterPipe } from './clientes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { ExamenesComponent } from './examenes/examenes.component';
import { DoctoresComponent } from './doctores/doctores.component';
import { DoctoresService } from './servicios/doctores/doctores.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    ClientesComponent,
    FilterPipe,
    LoginComponent,
    PacientesComponent,
    ExamenesComponent,
    DoctoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DoctoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
