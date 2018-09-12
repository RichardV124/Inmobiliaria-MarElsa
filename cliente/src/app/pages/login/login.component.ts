import { Customer } from './../../modelo/customer';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { RespuestaDTO } from '../../modelo/respuestaDTO';
import { Login } from '../../modelo/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  customers: Customer[];

  newCustomer: Customer = new Customer();
  newLogin: Login = new Login();
  respuestass: String;
respuesta: RespuestaDTO = new RespuestaDTO();

customerBuscado: Customer;

  constructor(private customerService: CustomerService) {

      //  this.registrarLogin();
       // this.listarCustomers();
       console.log('LAAAAAA');
       this.buscarCustomer();
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
    this.newLogin.username = 'cliente';
    this.newLogin.contrasenia = '1234';
    this.newCustomer.login = this.newLogin;

    this.customerService.registrarCustomer(this.newCustomer)
      .subscribe(customer => {
        this.respuesta = JSON.parse(JSON.stringify(customer));
        console.log(this.respuesta.msj + ' ASDADSFFFFFFFF');
        this.newCustomer = new Customer();
      });
  }

  registrarLogin() {
    this.newCustomer.id = 12;
    this.newCustomer.name = 'Alberto Francisco';
    this.newCustomer.email = 'albereto@gmail.com';
    this.newCustomer.phone = '44314545454';
    this.newCustomer.address = 'Avenida Bolivar 55';
    this.newLogin.username = 'cliente';
    this.newLogin.contrasenia = '1234';
    this.newCustomer.login = this.newLogin;

    this.customerService.registrarLogin(this.newCustomer)
      .subscribe(customer => {
        this.respuesta = JSON.parse(JSON.stringify(customer));
        console.log(this.respuesta.msj + ' ASDADSFFFFFFFF');
        this.newCustomer = new Customer();
      });
  }

  buscarCustomer() {

    this.customerService.buscarCustomer('115')
    .subscribe(customer => {
      this.customerBuscado = customer;
      console.log(this.customerBuscado.name + 'dentro');
      this.ensayo();
    });

  }

  ensayo() {
    console.log(this.customerBuscado.name + 'NICEE');
  }

}


