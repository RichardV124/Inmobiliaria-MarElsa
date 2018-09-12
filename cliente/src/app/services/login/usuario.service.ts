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
  return this.http.post<any>(`${this.domain}/usuarios/addlogin`, newUsuario)
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
buscarUsuario(id: string) {
  return this.http.get<any>(`${this.domain}/usuarios/search/${id}`)
  .map(res => {
    return res.data;
});

}

}
