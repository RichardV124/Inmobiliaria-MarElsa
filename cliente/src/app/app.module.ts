import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/publico/login/login.component';
import { RegistroUsuarioComponent } from './pages/publico/registro-usuario/registro-usuario.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { InicioComponent } from './pages/publico/inicio/inicio.component';
import { GestionPersonalComponent } from './pages/seguro/administrador/empleados/gestion-personal/gestion-personal.component';
import { RegistroClienteComponent } from './pages/publico/registro-cliente/registro-cliente.component';
import { RegistroInmuebleComponent } from './pages/seguro/empleado/registro-inmueble/registro-inmueble.component';
import { BusquedaClienteComponent } from './pages/seguro/cliente/busqueda-cliente/busqueda-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroUsuarioComponent,
    InicioComponent,
    GestionPersonalComponent,
    RegistroClienteComponent,
    RegistroInmuebleComponent,
    BusquedaClienteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
