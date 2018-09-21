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
 * @param newPersona, el empleado (con los datos del login ) que se va a registrar en la BD
 */
registrarPersona(newPersona: Persona) {
  return this.http.post<any>(`${this.domain}/persona/save`, newPersona)
    .map(res => res);
}

/**
 * Metodo que lista todos los empleados de la BD
 */
listarPersona() {
  return this.http.get<any>(`${this.domain}/persona`)
  .map(res => {
    return res.data;
});
}

/**
 * Metodo para buscar una persona por la cedula
 * @param cedula, cedula por el cual se buscara el persona, se envia por la ruta
 */
buscarPersona(cedula: string) {
  return this.http.get<any>(`${this.domain}/persona/search/${cedula}`)
  .map(res => {
    return res.data;
});

}

/**
 * Metodo que edita una persona en la BD
 * @param newPersona, el persona que se va a editar en la BD
 */
editarPersona(newPersona: Persona) {
  return this.http.post<any>(`${this.domain}/persona/edit/`, newPersona)
    .map(res => res);
}

/**
 * Metodo que elimina una persona en la BD
 * @param newPersona, el empleado que se va a eliminar en la BD
 */
eliminarPersonal(newPersona: Persona) {
  return this.http.post<any>(`${this.domain}/persona/delete/`, newPersona)
    .map(res => res);
}

/**
 * Metodo que lista todos los tipo personal de la BD
 */
listarTipoPersonal() {
  return this.http.get<any>(`${this.domain}/tipopersonal/listar`)
  .map(res => {
    return res.data;
});
}

}
