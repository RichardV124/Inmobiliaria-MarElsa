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
  * @param newCliente, el cliente (con los datos del login ) que se va a registrar en la BD
  */
  registrarCliente(newCliente: Cliente) {
    return this.http.post<any>(`${this.domain}/cliente/save`, newCliente)
      .map(res => res);
  }

  /**
  * Metodo que lista todos los cliente de la BD
  */
  listarCliente() {
    return this.http.get<any>(`${this.domain}/cliente`)
    .map(res => {
      return res.data;
  });
  }

  /**
   * Metodo para buscar un cliente
   * @param cedula, cedula por el cual se buscara el cliente, se envia por la ruta
   */
  buscarCliente(cedula: string) {
    return this.http.get<any>(`${this.domain}/cliente/search/:${cedula}`)
    .map(res => {
      return res.data;
  });

  }

  /**
   * Metodo que edita un cliente en la BD
   * @param newCliente, el cliente que se va a editar en la BD
   */
  editarPersonal(newCliente: Cliente) {
    return this.http.post<any>(`${this.domain}/cliente/edit/`, newCliente)
      .map(res => res);
  }

  /**
   * Metodo que elimina un cliente en la BD
   * @param newCliente, el cliente que se va a eliminar en la BD
   */
  eliminarPersonal(newCliente: Cliente) {
    return this.http.post<any>(`${this.domain}/cliente/delete/`, newCliente)
      .map(res => res);
  }

}
