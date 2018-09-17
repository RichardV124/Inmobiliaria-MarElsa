import { RespuestaDTO } from './../../../modelo/respuestaDTO';
import { Login } from './../../../modelo/login';
import { Cliente } from './../../../modelo/cliente';
import { ClienteService } from './../../../services/cliente/cliente.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {

  selectedCliente: Cliente = new Cliente();
  selectedLogin: Login = new Login();
  respuesta: RespuestaDTO = new RespuestaDTO();

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit() {
  }

  registrar() {

    if (this.selectedCliente.nombre == null || this.selectedCliente.apellido == null
      || this.selectedCliente.fecha_nacimiento == null || this.selectedCliente.cedula == null
      || this.selectedCliente.telefono == null || this.selectedCliente.direccion == null
      || this.selectedCliente.correo == null) {

    } else {
      this.selectedCliente.login_username = this.selectedLogin;
      this.clienteService.registrarCliente(this.selectedCliente)
      .subscribe(res => {
        this.respuesta = JSON.parse(JSON.stringify(res));
        console.log(this.respuesta.msj + ' SAVE');
        console.log(this.selectedCliente.nombre);
        this.selectedCliente = new Cliente();
        this.selectedLogin = new Login();
      });
    }
}
}
