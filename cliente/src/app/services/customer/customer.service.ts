import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../modelo/customer';
import { RespuestaDTO } from '../../modelo/respuestaDTO';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  /**
   * Ruta en la que se encuentran los servicios
   */
  domain = 'http://localhost:4300';


  constructor(private http: HttpClient) { }

/**
 * Metodo que lista todos los customer de la BD
 */
  listarCustomers() {
    return this.http.get<any>(`${this.domain}/customers`)
    .map(res => {
      return res.data;
  });
}

/**
 * Metodo que inserta un customer en la BD
 * @param newCustomer, el customer que se va a registrar en la BD
 */
registrarCustomer(newCustomer: Customer) {
  return this.http.post<any>(`${this.domain}/customers/add`, newCustomer)
    .map(res => res);
}
/**
 * Metodo que inserta un customer y login en la BD
 * @param newCustomer, el customer (con los datos del login ) que se va a registrar en la BD
 */
registrarLogin(newCustomer: Customer) {
  return this.http.post<any>(`${this.domain}/customers/addlogin`, newCustomer)
    .map(res => res);
}

/**
 * Metodo para buscar un customer
 * @param id, id por el cual se buscara el customer, se envia por la ruta
 */
buscarCustomer(id: string) {
  return this.http.get<any>(`${this.domain}/customers/search/${id}`)
  .map(res => {
    return res.data;
});
}

}
