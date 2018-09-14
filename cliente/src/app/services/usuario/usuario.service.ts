import { Usuario } from './../../modelo/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  /**
   * Ruta en la que se encuentran los servicios
   */
  domain = 'http://localhost:4300';

  constructor(private http: HttpClient) { }


/**
 * Metodo que inserta un usuario y login en la BD
 * @param newUsuario, el usuario (con los datos del login ) que se va a registrar en la BD
 */
registrarUsuario(newUsuario: Usuario) {
  return this.http.post<any>(`${this.domain}/usuarios/save`, newUsuario)
    .map(res => res);
}

/**
 * Metodo que lista todos los usuarios de la BD
 */
listarUsuarios() {
  return this.http.get<any>(`${this.domain}/usuarios`)
  .map(res => {
    return res.data;
});
}

/**
 * Metodo para buscar un usuario
 * @param id, id por el cual se buscara el usuario, se envia por la ruta
 */
buscarUsuario(cedula: string) {
  return this.http.get<any>(`${this.domain}/usuarios/search/${cedula}`)
  .map(res => {
    return res.data;
});

}

/**
 * Metodo que edita un usuario en la BD
 * @param newUsuario, el usuario que se va a editar en la BD
 */
editarUsuario(newUsuario: Usuario) {
  return this.http.post<any>(`${this.domain}/usuarios/edit`, newUsuario)
    .map(res => res);
}

/**
 * Metodo que elimina un usuario en la BD
 * @param newUsuario, el usuario que se va a eliminar en la BD
 */
eliminarUsuario(newUsuario: Usuario) {
  return this.http.post<any>(`${this.domain}/usuarios/delete`, newUsuario)
    .map(res => res);
}

}
