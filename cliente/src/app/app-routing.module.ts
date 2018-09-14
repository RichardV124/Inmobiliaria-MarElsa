import { GestionPersonalComponent } from './pages/seguro/administrador/empleados/gestion-personal/gestion-personal.component';
import { InicioComponent } from './pages/publico/inicio/inicio.component';
import { LoginComponent } from './pages/publico/login/login.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {path: 'inicio', component: InicioComponent},
  {path: 'login', component: LoginComponent},
  {path: 'gestion-personal', component: GestionPersonalComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forRoot(appRoutes)]
})
export class AppRoutingModule {}