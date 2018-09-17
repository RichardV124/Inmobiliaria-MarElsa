import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../modelo/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /**
   * Ruta en la que se encuentran los servicios
   */
  domain = 'http://localhost:4300';

  constructor(private http: HttpClient) { }

  /**
 * Metodo para buscar un usuario por username y contraseña
 * @param id, id por el cual se buscara el usuario, se envia por la ruta
 */
iniciarSesion(datosLogin: Login) {
  return this.http.post<any>(`${this.domain}/login/search`, datosLogin)
  .map(res => {
    return res.data;
});

}

/**
   * Metodo para buscar un login
   * @param username, username por el cual se buscara el login, se envia por la ruta
   */
  buscarLogin(username: string) {
    return this.http.get<any>(`${this.domain}/login/search2/${username}`)
    .map(res => {
      return res.data;
  });

  }


}
