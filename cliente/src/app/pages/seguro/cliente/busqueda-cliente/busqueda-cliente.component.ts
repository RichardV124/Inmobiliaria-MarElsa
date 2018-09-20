import { LoginService } from './../../../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../../modelo/cliente';
import { Login } from '../../../../modelo/login';
import { Rol } from '../../../../modelo/rol';
import { RespuestaDTO } from '../../../../modelo/respuestaDTO';
import { ClienteService } from '../../../../services/cliente/cliente.service';

@Component({
  selector: 'app-busqueda-cliente',
  templateUrl: './busqueda-cliente.component.html',
  styleUrls: ['./busqueda-cliente.component.css']
})
export class BusquedaClienteComponent implements OnInit {

  selectedCliente: Cliente = new Cliente();
  selectedLogin: Login = new Login();
  rol: Rol = new Rol();
  respuesta: RespuestaDTO = new RespuestaDTO();

  constructor(private clienteService: ClienteService, private loginService: LoginService) { }

  ngOnInit() {
  }
/** 
  buscar() {

    if (this.selectedCliente.cedula == null) {

    } else {
      this.clienteService.buscarCliente(this.selectedCliente.cedula)
      .subscribe(cliente => {
        if (cliente === undefined ) {
          this.respuesta.msj = 'No se encuentra ningun cliente con la cedula ' +  this.selectedCliente.cedula;
          console.log('NO SE ENCUENTRA');
          this.limpiarcampos();
        } else {
          this.selectedCliente = JSON.parse(JSON.stringify(cliente));
          let username = JSON.parse(JSON.stringify(cliente))['login_username'];
          console.log(username + ' CONCHETUMADRE!!! .l.');
          this.loginService.buscarLogin(username)
            .subscribe(login => {
              if (login === undefined ) {
                this.respuesta.msj = 'No se encuentra ningun login con el username ' +  this.selectedCliente.cedula;
                console.log('NO SE ENCUENTRA EL LOGIN');
              } else {
              this.selectedLogin = JSON.parse(JSON.stringify(login));
              console.log(this.selectedLogin.username + ' SEARCH');
              }
            });
          }
        });
    }
  }
*/
  limpiarcampos() {
    this.selectedCliente.nombre = null;
    this.selectedCliente.apellido = null;
    this.selectedCliente.correo = null;
    this.selectedCliente.direccion = null;
    this.selectedCliente.telefono = null;
    this.selectedCliente.fecha_nacimiento = null;

    this.selectedLogin.username = null;
    this.selectedLogin.contrasenia = null;
  }
}
