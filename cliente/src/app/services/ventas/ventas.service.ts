import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Venta } from './../../modelo/venta';
import { Visita } from 'src/app/modelo/visita';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  domain = 'http://localhost:4300';

  constructor(private http: HttpClient) { }

  registrarInmuebleVenta(venta: Venta) {
    return this.http.post<any>(`${this.domain}/venta/add`, venta)
    .map(res => res);
  }

  buscarInmuebleVenta(inmueble_id: number) {
    return this.http.get<any>(`${this.domain}/venta/search/${inmueble_id}`)
    .map(res => {
      return res.data;
    });
  }

  eliminar(venta: Venta) {
    return this.http.post<any>(`${this.domain}/venta/delete/`, venta)
    .map(res => res);
  }

  activar(venta: Venta) {
    return this.http.post<any>(`${this.domain}/venta/activar/`, venta)
    .map(res => res);
  }

 registroVenta(venta: Venta){
  return this.http.post<any>(`${this.domain}/venta/addVenta`, venta)
  .map(res => res);
 }

 buscarPorInmbuebleyCedula(visita: Visita){
  return this.http.post<any>(`${this.domain}/visita/search`, visita)
  .map(res => res);
 }
}
