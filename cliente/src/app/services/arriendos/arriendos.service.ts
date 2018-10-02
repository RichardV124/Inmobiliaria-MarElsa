import { Arriendo } from './../../modelo/arriendo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArriendosService {

   /**
   * Ruta en la que se encuentran los servicios
   */
  domain = 'http://localhost:4300';

  constructor(private http: HttpClient) { }

  registrarInmubeleArriendo(arriendo: Arriendo) {
    console.log(arriendo);
    return this.http.post<any>(`${this.domain}/arriendo/add`, arriendo)
    .map(res => res);
  }

  buscarInmuebleArriendo(inmueble_id: number) {
    return this.http.get<any>(`${this.domain}/arriendo/search/${inmueble_id}`)
    .map(res => {
      return res.data;
    });
  }

  eliminar(arriendo: Arriendo) {
    return this.http.post<any>(`${this.domain}/arriendo/delete/`, arriendo)
    .map(res => res);
  }

  activar(arriendo: Arriendo) {
    return this.http.post<any>(`${this.domain}/arriendo/activar/`, arriendo)
    .map(res => res);
  }

}
