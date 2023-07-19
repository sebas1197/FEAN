import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { ClientesComponent } from './clientes/clientes.component';
import { LoginComponent } from './login/login.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { ExamenesComponent } from './examenes/examenes.component';
import { DoctoresComponent } from './doctores/doctores.component';

const routes: Routes = [
  { path: '', component: PrincipalComponent},
  { path: 'clientes', component: ClientesComponent },
  { path: 'login', component: LoginComponent},
  { path: 'pacientes', component: PacientesComponent},
  { path: 'pacientes/:id', component: PacientesComponent},
  { path: 'examenes', component: ExamenesComponent},
  { path: 'doctores', component: DoctoresComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
