import { Persona } from './../../modelo/persona';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

/**
   * Ruta en la que se encuentran los servicios
   */
  domain = 'http://localhost:4300';

  constructor(private http: HttpClient) { }


/**
 * Metodo que inserta un empleado y login en la BD
 * @param newPersonal, el personal (con los datos del login ) que se va a registrar en la BD
 */
registrarPersonal(newPersonal: Persona) {
  return this.http.post<any>(`${this.domain}/personal/save`, newPersonal)
    .map(res => res);
}

/**
 * Metodo que lista todos los empleados de la BD
 */
listarPersonal() {
  return this.http.get<any>(`${this.domain}/personal`)
  .map(res => {
    return res.data;
});
}

/**
 * Metodo para buscar un empleado
 * @param id, id por el cual se buscara el empleado, se envia por la ruta
 */
buscarPersonal(cedula: string) {
  return this.http.get<any>(`${this.domain}/personal/search/${cedula}`)
  .map(res => {
    return res.data;
});

}

/**
 * Metodo que edita un empleado en la BD
 * @param newPersonal, el empleado que se va a editar en la BD
 */
editarPersonal(newPersonal: Persona) {
  return this.http.post<any>(`${this.domain}/personal/edit/`, newPersonal)
    .map(res => res);
}

/**
 * Metodo que elimina un empleado en la BD
 * @param newUsuario, el empleado que se va a eliminar en la BD
 */
eliminarPersonal(newPersonal: Persona) {
  return this.http.post<any>(`${this.domain}/personal/delete/`, newPersonal)
    .map(res => res);
}

/**
 * Metodo que lista todos los tipo personal de la BD
 */
listarTipoPersonal() {
  return this.http.get<any>(`${this.domain}/tipopersonal`)
  .map(res => {
    return res.data;
});
}

}
