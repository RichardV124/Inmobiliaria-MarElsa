import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/publico/login/login.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { InicioComponent } from './pages/publico/inicio/inicio.component';
import { GestionPersonalComponent } from './pages/seguro/administrador/empleados/gestion-personal/gestion-personal.component';
import { RegistroClienteComponent } from './pages/publico/registro-cliente/registro-cliente.component';
import { RegistroInmuebleComponent } from './pages/seguro/empleado/registro-inmueble/registro-inmueble.component';
import { BusquedaClienteComponent } from './pages/seguro/cliente/busqueda-cliente/busqueda-cliente.component';
import { HeaderComponent } from './pages/publico/header/header.component';
import { AsignarAccesoComponent } from './pages/seguro/administrador/asignar-acceso/asignar-acceso.component';
import { EditarClienteComponent } from './pages/seguro/cliente/editar-cliente/editar-cliente.component';
import { BuscarByNombrePipe } from './filtros/buscar-by-nombre.pipe';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    GestionPersonalComponent,
    RegistroClienteComponent,
    RegistroInmuebleComponent,
    BusquedaClienteComponent,
    EditarClienteComponent,
    HeaderComponent,
    AsignarAccesoComponent,
    BuscarByNombrePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
