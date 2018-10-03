import { Empleado } from './../../modelo/empleado';
import { EmpleadoDTO } from './../../modelo/dto/empleadoDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

 /**
   * Ruta en la que se encuentran los servicios
   */
  domain = 'http://localhost:4300';

  constructor(private http: HttpClient) { }


 /**
  * Metodo que inserta un empleado en la BD
  * @param empleado, el empleado (con los datos del login ) que se va a registrar en la BD
  */
 registrarEmpleado(empleado: EmpleadoDTO) {
  return this.http.post<any>(`${this.domain}/empleado/save`, empleado)
    .map(res => res);
}

/**
   * Metodo para buscar un empleado
   * @param cedula, cedula por el cual se buscara el empleado, se envia por la ruta
   */
  buscarEmpleado(cedula: string) {
    return this.http.get<any>(`${this.domain}/empleado/search/${cedula}`)
    .map(res => {
      return res.data;
  });

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

/**
 * Metodo que lista todos los empleados de la BD
 */
listarEmpleados() {
  return this.http.get<any>(`${this.domain}/empleado/listar`)
  .map(res => {
    return res.data;
});
}

/**
 * Metodo que elimina un empleado de la BD
 * @param empleado, el empleado que se va a eliminar en la BD
 */
eliminarEmpleado(empleado: EmpleadoDTO) {
  console.log(empleado);
  return this.http.post<any>(`${this.domain}/empleado/delete`, empleado)
    .map(res => res);
}

/**
 * Metodo que edita un empleado en la BD
 * @param empleado, el empleado que se va a editar en la BD
 */
editarEmpleado(empleado: EmpleadoDTO) {
  return this.http.post<any>(`${this.domain}/empleado/edit`, empleado)
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

