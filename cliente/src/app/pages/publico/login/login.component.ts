import { Rol } from './../../../modelo/rol';
import { Globals } from './../../../modelo/global/globals';
import { Customer } from './../../../modelo/customer';
import { CustomerService } from './../../../services/customer/customer.service';
import { Prueba } from './../../../modelo/prueba';
import { Usuario } from './../../../modelo/usuario';
import { Component, OnInit } from '@angular/core';
import { RespuestaDTO } from '../../../modelo/respuestaDTO';
import { Login } from '../../../modelo/login';
import { LoginService } from '../../../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

respuesta: RespuestaDTO = new RespuestaDTO();

customerLogin: Customer = new Customer();
usuarioLogin: Usuario = new Usuario();
loginBuscar: Login = new Login();
rolBuscado: Rol = new Rol();

  constructor(private loginService: LoginService, private customerService: CustomerService, private global: Globals,
  private router: Router) {

    this.loginBuscar.username = 'kuro';
    this.loginBuscar.contrasenia = '1234';
    console.log('CONSTRUCTOR LOGIN');
}

  ngOnInit() {
  }

iniciarSesion() {


  this.loginService.iniciarSesion(this.loginBuscar)
  .subscribe(customer => {
    this.usuarioLogin = customer;
    const rol = JSON.stringify(customer['ROL']);
    this.rolBuscado.id = rol;
    this.usuarioLogin.rol = this.rolBuscado;
    console.log(JSON.parse(JSON.stringify(customer)));
    console.log(this.usuarioLogin.nombre  + 'GGG');
    this.changedRole();
  });
  this.loginBuscar = new Login();
  this.router.navigate(['']);
}

private changedRole() {
  this.global.role = this.usuarioLogin.rol.id;
}

}


