import { Router } from '@angular/router';
import { LoginService } from './../../../services/login/login.service';
import { Acceso } from './../../../modelo/acceso';
import { Component, OnInit } from '@angular/core';
import { Login } from '../../../modelo/login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Usuario que inicio sesion en la aplicacion
  usuario: Login;
  // Listado de Accesos a los que puede ingresar el usuario que inicio sesion
  accesos: Array<Acceso> = [];


  constructor(private servicios: LoginService, private router: Router) {
   }

  ngOnInit() {
    this.usuario = this.servicios.getUsuario();
    if (this.usuario != null) {
      this.accesos = this.usuario.persona.rol.accesos;
    }
  }

  /**
   * Cerramos la sesion del usuario
   */
  logout(event) {
    this.servicios.logout();
    this.router.navigate(['/']);
  }
}
