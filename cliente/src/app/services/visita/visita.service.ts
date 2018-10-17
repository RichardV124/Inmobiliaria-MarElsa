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

}
