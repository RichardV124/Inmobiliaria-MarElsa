import { Rol } from './../../modelo/rol';
import { Persona } from './../../modelo/persona';
import { Acceso } from './../../modelo/acceso';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../modelo/login';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Usuario que inicio sesion en la aplicacion
  public usuario: Login;

  // Ruta raiz donde se encuentran los servicios
  domain = 'http://localhost:4300/';

  constructor(private http: HttpClient, private router: Router) {
  }
  /**
   * Asignamos el usuario que inicio sesion y el estado a logeado
   * @param logeado el usuario que se conecto
   */
  setUsuario(logeado: Login) {
      this.usuario = logeado;
      localStorage.setItem('usuario', JSON.stringify(logeado));
    }

  /**
   * Accedemos al usuario que se conecto
   */
  getUsuario() {
      return JSON.parse(localStorage.getItem('usuario'));
  }

  /**
   * Validamos si el usuario puede ingresar a una pagina
   * @param page pagina a la que intenta ingresar el usuario
   * retorna true dado el caso en que no pueda ingresar
   * retorna false cuando si puede ingresar
   */
  esAccesible(page: string) {
      this.usuario = this.getUsuario();
      // Validamos si el usuario inicio sesion
      if (this.usuario == null) {
          // Como no ha iniciado sesion, lo redirigimos al login
          this.router.navigate(['/login']);
      } else {
          // Validamos si el usuario tiene acceso a la pagina
          if (this.pageInArray(page, this.usuario.persona_cedula.rol.accesos)) {
              // Como no tiene acceso, lo redirigimos al inicio
              this.router.navigate(['/']);
          }
      }
  }

  /**
   * Valida si una pagina esta en el array de accesos
   * retorna true si no esta, de lo contrario false
   */
  pageInArray(page: string, accesos: Array<Acceso>) {
      for (let acceso of accesos) {
          if (acceso.url === page) {
              return false;
          }
      }
      return true;
  }

  /**
   * Iniciar sesion
   * @param usuario el usuario que intenta conectarse
   */
  login (usuario: Login) {
      return this.http.get<any>(this.domain + 'login/login/' + usuario.username + '/' + usuario.contrasenia)
      .map(res => {
              return res;
          });
  }

  /**
   * Cerrar Sesion
   */
  logout () {
      this.usuario = null;
      // Limpiamos el storage
      localStorage.clear();
  }

  /**
   * Obtenemos la informacion de la persona del usuario que inicio sesion
   * @param usuario el usuario al que vamos a obtener la persona
   */
  getUsuarioPersona (usuario: Login) {
    return this.http.get<any>(this.domain + 'persona/search/' + usuario.persona_cedula)
    .map(res => {
            return res;
        });
}

  /**
   * Obtenemos la informacion del Rol de la persona del usuario que inicio sesion
   * @param rol el rol al que vamos a obtener la informacion
   */
  getUsuarioPersonaRol (persona: Persona) {
      return this.http.get<any>(this.domain + 'rol/rol-by-id/' + persona.rol_id)
      .map(res => {
              return res;
          });
  }

  /**
   * Obtenemos la lista de Accesos del Rol de la persona del usuario que inicio sesion
   * @param rol el rol al que vamos a obtener los accesos
   */
  getUsuarioRolAccesos (rol: Rol) {
      return this.http.get<any>(this.domain + 'acceso/por-rol/' + rol.id)
          .map(res => {
              return res;
          });
  }
}
