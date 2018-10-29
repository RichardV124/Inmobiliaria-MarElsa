import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Venta } from './../../modelo/venta';
import { Visita } from 'src/app/modelo/visita';
import { Contrato } from 'src/app/modelo/contrato';

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
  registrarContrato(contrato: Contrato) {
    return this.http.post<any>(`${this.domain}/contrato/add`, contrato)
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

 registroVenta(venta: Venta) {
  return this.http.post<any>(`${this.domain}/venta/addVenta`, venta)
  .map(res => res);
 }

 buscarPorInmbuebleyCedula(cedula_cliente, inmueble_id) {
  return this.http.get<any>(`${this.domain}/visita/buscarPorInmbuebleyCedula/${cedula_cliente}/${inmueble_id}`)
  .map(res => {
    return res.data;
  });

 }

 /**
  * lista las ventas de la base de datos
  */
 listarVentas() {
  return this.http.get<any>(`${this.domain}/venta/listVentas`)
  .map(res => {
    return res.data;
  });
}

buscarVentaPorId(id: number) {
  return this.http.get<any>(`${this.domain}/venta/buscarVentaPorId/${id}`)
  .map(res => {
    return res.data;
  });
}

editarVenta(venta: Venta) {
  return this.http.post<any>(`${this.domain}/venta/update/`, venta)
  .map(res => res);
}

listarUltimaVenta() {
  return this.http.get<any>(`${this.domain}/venta/listUltimaVenta`)
  .map(res => {
    return res.data;
  });
}

 /**
  * lista los contratos de la base de datos
  */
 listarContratos() {
  return this.http.get<any>(`${this.domain}/venta/listContratos`)
  .map(res => {
    return res.data;
  });
}

eliminarContrato(contrato: Contrato) {
  return this.http.post<any>(`${this.domain}/venta/deleteContrato/`, contrato)
  .map(res => res);
}

buscarVisitaId(id: number) {
  return this.http.get<any>(`${this.domain}/venta/buscarVisitaId/${id}`)
  .map(res => {
    return res.data;
  });
}

editarContrato(contrato: Contrato) {
  return this.http.post<any>(`${this.domain}/venta/update_contrato/`, contrato)
  .map(res => res);
}
/**
 * 
 * @param id busca una visita por un inmueble
 */
buscarVisitaIdInmueble(id: number) {
  return this.http.get<any>(`${this.domain}/venta/buscarVisitaIdInmueble/:visita_id${id}`)
  .map(res => {
    return res.data;
  });
}
}
