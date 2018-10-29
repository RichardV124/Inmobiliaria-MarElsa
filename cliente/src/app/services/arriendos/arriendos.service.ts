import { Arriendo } from './../../modelo/arriendo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Visita } from 'src/app/modelo/visita';

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

  buscarArriendo(arriendo_id: number) {
    return this.http.get<any>(`${this.domain}/arriendo/search/${arriendo_id}`)
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

  EditarArriendo(arriendo: Arriendo) {
    return this.http.post<any>(`${this.domain}/arriendo/update/`, arriendo)
    .map(res => res);
  }

 listarArriendos() {
  return this.http.get<any>(`${this.domain}/arriendo/`) . map(res => {
      return res.data;
   });
 }

buscarInmuebleArrendado(inmueble_id: number) {
  return this.http.get<any>(`${this.domain}/arriendo/searchI/${inmueble_id}`)
  .map(res => {
    return res.data;
  });
}

buscarInmuebleVendido(inmueble_id: number) {
  return this.http.get<any>(`${this.domain}/arriendo/searchVendido/${inmueble_id}`)
  .map(res => {
    return res.data;
  });
}


buscarVisita(visita: Visita) {
  return this.http.post<any>(`${this.domain}/arriendo/searchV/`, visita)
  .map(res => res);
}

searchVisita (cedula_cliente, inmueble_id) {
  return this.http.get<any>(`${this.domain}/arriendo/searchVisita/${cedula_cliente}/${inmueble_id}`)
  .map(res => {
    return res.data;
  });
}

buscarInmuebleId(inmueble_id: number) {
  return this.http.get<any>(`${this.domain}/arriendo/searchinmuebleid/${inmueble_id}`)
  .map(res => {
    return res.data;
  });
}
}
