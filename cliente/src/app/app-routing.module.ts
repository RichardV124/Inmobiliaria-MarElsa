import { GestionVisitasComponent } from './pages/publico/gestion-visitas/gestion-visitas.component';
import { GestionArriendoComponent } from './pages/seguro/empleado/arriendo/gestion-arriendo/gestion-arriendo.component';
import { VerVisitasComponent } from './pages/seguro/empleado/ver-visitas/ver-visitas.component';
import { AsignarVisitaComponent } from './pages/seguro/administrador/asignar-visita/asignar-visita.component';
import { AsignarAccesoComponent } from './pages/seguro/administrador/asignar-acceso/asignar-acceso.component';
import { RegistroInmuebleComponent } from './pages/seguro/empleado/registro-inmueble/registro-inmueble.component';
import { GestionPersonalComponent } from './pages/seguro/administrador/empleados/gestion-personal/gestion-personal.component';
import { InicioComponent } from './pages/publico/inicio/inicio.component';
import { LoginComponent } from './pages/publico/login/login.component';
import { AppComponent } from './app.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroClienteComponent } from './pages/publico/registro-cliente/registro-cliente.component';
import { BusquedaClienteComponent } from './pages/seguro/cliente/busqueda-cliente/busqueda-cliente.component';
import { EditarClienteComponent } from './pages/seguro/cliente/editar-cliente/editar-cliente.component';
import { RegistroVentaComponent } from './pages/seguro/empleado/registro-venta/registro-venta.component';
import { GestionVisitaComponent } from './pages/seguro/cliente/gestion-visita/gestion-visita.component';
import { ReportesComponent } from './pages/seguro/administrador/reportes/reportes.component';


const appRoutes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'login', component: LoginComponent},
  {path: 'gestion-personal', component: GestionPersonalComponent},
  {path: 'registro-cliente', component: RegistroClienteComponent},
  {path: 'busqueda-cliente', component: BusquedaClienteComponent},
  {path: 'editar-cliente', component: EditarClienteComponent},
  {path: 'asignar-acceso', component: AsignarAccesoComponent},
  {path: 'registro-inmueble', component: RegistroInmuebleComponent},
  {path: 'asignar-visita', component: AsignarVisitaComponent},
  {path: 'registro-arriendo', component: GestionArriendoComponent},
  {path: 'gestion-visita', component: GestionVisitaComponent},
  {path: 'ver-visitas', component: VerVisitasComponent},
  {path: 'registro-venta', component: RegistroVentaComponent},
  {path: 'gestion-visitas-cliente', component: GestionVisitasComponent},
  {path: 'reportes', component: ReportesComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forRoot(appRoutes)]
})
export class AppRoutingModule {}
