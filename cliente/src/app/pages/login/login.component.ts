import { Customer } from './../../modelo/customer';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { RespuestaDTO } from '../../modelo/respuestaDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  customers: Customer[];

  newCustomer: Customer = new Customer();
  respuestass: String;
respuesta: RespuestaDTO = new RespuestaDTO();

  constructor(private customerService: CustomerService) {

        this.registrarCustomer();
        this.listarCustomers();
}

  ngOnInit() {
  }

  listarCustomers() {
    this.customerService.listarCustomers()
    .subscribe(customers => {
      this.customers = customers;
    });
  }

  registrarCustomer() {
    this.newCustomer.id = 12;
    this.newCustomer.name = 'Alberto Francisco';
    this.newCustomer.email = 'albereto@gmail.com';
    this.newCustomer.phone = '44314545454';
    this.newCustomer.address = 'Avenida Bolivar 55';
    this.customerService.registrarCustomer(this.newCustomer)
      .subscribe(customer => {
        this.respuesta = JSON.parse(JSON.stringify(customer));
        console.log(this.respuesta.msj + ' ASDADSFFFFFFFF');
        this.newCustomer = new Customer();
      });
  }

}
