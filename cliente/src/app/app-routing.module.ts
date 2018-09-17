import { GestionPersonalComponent } from './pages/seguro/administrador/empleados/gestion-personal/gestion-personal.component';
import { InicioComponent } from './pages/publico/inicio/inicio.component';
import { LoginComponent } from './pages/publico/login/login.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroClienteComponent } from './pages/publico/registro-cliente/registro-cliente.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {path: 'inicio', component: InicioComponent},
  {path: 'login', component: LoginComponent},
  {path: 'gestion-personal', component: GestionPersonalComponent},
  {path: 'registro-cliente', component: RegistroClienteComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forRoot(appRoutes)]
})
export class AppRoutingModule {}
