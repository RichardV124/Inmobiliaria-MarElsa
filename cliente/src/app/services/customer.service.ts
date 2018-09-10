import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../modelo/customer';
import { RespuestaDTO } from '../modelo/respuestaDTO';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  domain = 'http://localhost:4300';


  constructor(private http: HttpClient) { }


  listarCustomers() {
    return this.http.get<any>(`${this.domain}/customers`)
    .map(res => {
      return res.data;
  });
}

registrarCustomer(newCustomer: Customer) {
  return this.http.post<any>(`${this.domain}/customers/add`, newCustomer)
    .map(res => res);
}

}
