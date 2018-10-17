import { Visita } from './../../modelo/visita';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  /**
   * Ruta en la que se encuentran los servicios
   */
  domain = 'http://localhost:4300';

  constructor(private http: HttpClient) { }

/**
 * Metodo que lista las visitas por un determinado estado
 */
listarVisitasPorEstado(estado) {
  return this.http.get<any>(`${this.domain}/visita/listarPorEstado/${estado}`)
  .map(res => {
    return res.data;
});
}

/**
 * Metodo que asgina una visita a un empleado, en un horario disponible
 * @param visita, la visita que contiene el empleado al que se le asignara la visita
 */
asignarVisita(visita: Visita) {
  return this.http.post<any>(`${this.domain}/visita/asignarVisita`, visita)
    .map(res => res);
}

  /* Metodo que inserta una visita que solicita el cliente para el registro de su inmueble en la BD
  * @param newVisita, la visita que se va a registrar en la BD
  */
 registrarVisitaCliente(newVisita: Visita) {
  return this.http.post<any>(`${this.domain}/visita/save-visita-cliente`, newVisita)
    .map(res => res);
}

/**
 * Metodo que lista las visitas de un cliente por un estado determinado
 */
listarVisitasPorClienteAndEstado(cliente, estado) {
  return this.http.get<any>(`${this.domain}/visita/listarPorClienteAndEstado/${cliente}/${estado}`)
  .map(res => {
    return res.data;
});
}

/**
 * Metodo para eliminar una cita de la base de datos
 */
eliminar(id) {
  return this.http.get<any>(`${this.domain}/visita/delete/${id}`)
  .map(res => {
    return res.data;
});
}

/**
     * metodo para modificar el mormato de la fecha, ignorando la hora
     * y solo teniendo en cuenta la fecha como tal
     * @param date
     */
    formatoFecha(date) {
      // Cortamos el date a 10 caracteres y luego hacemos split cada que encuentre un -
      const data = date.slice(0, 10).split('-');
      // retornamos año-mes-dia
      return data[0] + '-' + data[1] + '-' + data[2];
  }

}
