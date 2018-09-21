import { AccesoRol } from './../../modelo/acceso_rol';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccesoRolService {

/**
   * Ruta en la que se encuentran los servicios
   */
  domain = 'http://localhost:4300';

  constructor(private http: HttpClient) { }


/**
 * Metodo que asgina un acceso a un rol
 * @param accesoRol, el accesoRol que contiene el rol al que se le asignara el acceso
 * y el acceso a asignar
 */
asignarAcceso(accesoRol: AccesoRol) {
  return this.http.post<any>(`${this.domain}/acceso-rol/save`, accesoRol)
    .map(res => res);
}


/**
 * Metodo que lista todos los roles de la BD
 */
listarRoles() {
  return this.http.get<any>(`${this.domain}/rol/listar`)
  .map(res => {
    return res.data;
});
}

/**
 * Metodo que lista todos los accesos de la BD
 */
listarAccesos() {
  return this.http.get<any>(`${this.domain}/acceso/listar`)
  .map(res => {
    return res.data;
});
}

/**
 * Metodo que lista todos los accesos rol de la BD
 */
listarAccesosRol() {
  return this.http.get<any>(`${this.domain}/rol-accesos/listar`)
  .map(res => {
    return res.data;
});
}

/**
 * Metodo que busca un rol por id
 */
buscarRolPorId(id: number) {
  return this.http.get<any>(`${this.domain}/rol/rol-by-id/${id}`)
  .map(res => {
    return res.data;
});
}

buscarAccesoRol(rol: number, acceso: number ) {
  return this.http.get<any>(`${this.domain}/acceso-rol/search/${rol}/${acceso}`)
  .map(res => {
    return res.data;
});
}

buscarAccesoPorId(id: number) {
  return this.http.get<any>(`${this.domain}/acceso/acceso-by-id/${id}`)
  .map(res => {
    return res.data;
});
}

/**
 * Metodo que elimina un acceso asignado a un rol en la BD
 * @param accesoRol, el accesoRol que se va a eliminar en la BD
 */
eliminarAccesoRol(accesoRol: AccesoRol) {
  console.log(accesoRol);
  return this.http.post<any>(`${this.domain}/acceso-rol/delete/`, accesoRol)
    .map(res => res);
}

}
