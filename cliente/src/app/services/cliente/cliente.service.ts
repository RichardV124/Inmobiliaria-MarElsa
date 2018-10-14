import { Login } from './../../modelo/login';
import { Persona } from './../../modelo/persona';
import { Cliente } from './../../modelo/cliente';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  /**
   * Ruta en la que se encuentran los servicios
   */
  domain = 'http://localhost:4300';

  constructor(private http: HttpClient) { }

  /**
  * Metodo que inserta un cliente y su login en la BD
  * @param newPersona, el cliente (con los datos del login ) que se va a registrar en la BD
  */
  registrarPersona(newPersona: Login) {
    return this.http.post<any>(`${this.domain}/cliente/save`, newPersona)
      .map(res => res);
  }

  /**
  * Metodo que lista todos los cliente de la BD
  */
  listarClientes() {
    return this.http.get<any>(`${this.domain}/cliente`)
    .map(res => {
      return res.data;
  });
  }

  /**
   * Metodo para buscar un cliente
   * @param cedula, cedula por el cual se buscara el cliente, se envia por la ruta
   */
  buscarPersona(cedula: string) {
    return this.http.get<any>(`${this.domain}/cliente/search/${cedula}`)
    .map(res => {
      return res.data;
  });

  }

  /**
   * Metodo para buscar un cliente
   * @param cedula, cedula por el cual se buscara el cliente, se envia por la ruta
   */
  buscarLoginPersona(cedula: string) {
    return this.http.get<any>(`${this.domain}/login/usuario-by-persona/${cedula}`)
    .map(res => {
      return res.data;
  });

  }

  /**
   * Metodo que edita un cliente en la BD
   * @param newPersona, el cliente que se va a editar en la BD
   */
  editarPersona(newPersona: Login) {
    return this.http.post<any>(`${this.domain}/cliente/edit/`, newPersona)
      .map(res => res);
  }

  /**
   * Metodo que elimina un cliente en la BD
   * @param newPersona, el cliente que se va a eliminar en la BD
   */
  eliminarPersona(newPersona: Persona) {
    return this.http.post<any>(`${this.domain}/cliente/delete/`, newPersona)
      .map(res => res);
  }

  /**
     *
     * @param date
     */
    formatoFecha(date) {
      // Cortamos el date a 10 caracteres y luego hacemos split cada que encuentre un -
      const data = date.slice(0, 10).split('-');
      // retornamos año-mes-dia
      return data[0] + '-' + data[1] + '-' + data[2];
  }

}
