import { MunicipioService } from './../../../../services/municipio/municipio.service';
import { LoginService } from './../../../../services/login/login.service';
import { ClienteService } from './../../../../services/cliente/cliente.service';
import { Departamento } from './../../../../modelo/departamento';
import { Municipio } from './../../../../modelo/municipio';
import { Persona } from './../../../../modelo/persona';
import { Component, OnInit } from '@angular/core';
import { Login } from '../../../../modelo/login';
import { RespuestaDTO } from '../../../../modelo/respuestaDTO';
import { Acceso } from '../../../../modelo/Acceso';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  selectedPersona: Persona = new Persona();
  selectedLogin: Login = new Login();
  user: Login = new Login();
  respuesta: RespuestaDTO = new RespuestaDTO();
  listaMunicipios: Municipio[];
  listaDepartamentos: Departamento[];
  selectedMunicipio: Municipio = new Municipio();
  selectedDepartamento: Departamento = new Departamento();
  show = 0;
  accesos: Array<Acceso> = [];

  constructor(private clienteService: ClienteService, private loginService: LoginService
    , private municipioService: MunicipioService) {
      // this.loginService.esAccesible('editar-cliente');
      this.listarDepartamentos();
      this.user = this.loginService.getUsuario();
      this.buscar(this.user.persona_cedula.cedula);
    }

  ngOnInit() {
  }

  buscar(cedula: string) {
      this.clienteService.buscarPersona(cedula)
      .subscribe(cliente => {
        if (cliente === undefined ) {
          this.respuesta.msj = 'No se encuentra ningun cliente con la cedula ' +  this.selectedPersona.cedula;
          console.log('NO SE ENCUENTRA');
        } else {
          this.selectedPersona = JSON.parse(JSON.stringify(cliente));
          this.municipioService.buscarMunicipio(cliente['municipio_id'])
          .subscribe(mun => {
              console.log('DEPTOOOOOO!!!!!!!!!!!!' + mun['departamento_id']);
              this.selectedDepartamento.id = mun['departamento_id'];
              this.listarMunicipios();
              this.selectedMunicipio = mun;
            });
          this.clienteService.buscarLoginPersona(cliente.cedula)
          .subscribe(login => {
              if (login === undefined ) {
                this.respuesta.msj = 'No se encuentra ningun login con el username ' +  this.selectedPersona.cedula;
                console.log('NO SE ENCUENTRA EL LOGIN');
              } else {
              this.selectedLogin = JSON.parse(JSON.stringify(login));
              console.log(this.selectedLogin.username + ' SEARCH');
              }
            });
          }
        });
   }

  listarDepartamentos() {
    this.municipioService.listarDepartamentos().
    subscribe(departamento => {
      this.listaDepartamentos = departamento;
    });
  }

  listarMunicipios() {
    this.municipioService.listarMunicipios(this.selectedDepartamento.id).
    subscribe(municipio => {
      this.listaMunicipios = municipio;
    });
  }
}
