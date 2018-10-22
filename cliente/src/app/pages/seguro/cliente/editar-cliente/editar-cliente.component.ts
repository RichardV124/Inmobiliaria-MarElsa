import { MunicipioService } from './../../../../services/municipio/municipio.service';
import { LoginService } from './../../../../services/login/login.service';
import { ClienteService } from './../../../../services/cliente/cliente.service';
import { Departamento } from './../../../../modelo/departamento';
import { Municipio } from './../../../../modelo/municipio';
import { Persona } from './../../../../modelo/persona';
import { Component, OnInit } from '@angular/core';
import { Login } from '../../../../modelo/login';
import { RespuestaDTO } from '../../../../modelo/respuestaDTO';
import { Rol } from '../../../../modelo/rol';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  selectedPersona: Persona = new Persona();
  selectedLogin: Login = new Login();
  rol: Rol = new Rol();
  user: Login = new Login();
  respuesta: RespuestaDTO = new RespuestaDTO();
  listaMunicipios: Municipio[];
  listaDepartamentos: Departamento[];
  selectedMunicipio: Municipio = new Municipio();
  selectedDepartamento: Departamento = new Departamento();
  show = 0;

  // variables de verificacion
  editado = false;
  listandoDepartamentos = false;
  listandoMunicipios = false;

  constructor(private clienteService: ClienteService, private loginService: LoginService
    , private municipioService: MunicipioService) {
      this.loginService.esAccesible('editar-cliente');
      this.listarDepartamentos();
      this.user = this.loginService.getUsuario();
      this.buscar(this.user.persona_cedula.cedula);
    }

  ngOnInit() {
  }

  cerrarMsj() {
    this.show = 0;
  }

  verificarEditar(): boolean {
    return this.editado ;
  }

  verificarListarDepartamentos(): boolean {
    return this.listandoDepartamentos;
  }

  verificarListarMunicipios(): boolean {
    return this.listandoMunicipios;
  }

  buscar(cedula: string) {
      this.clienteService.buscarPersona(cedula)
      .subscribe(cliente => {
        if (cliente === undefined ) {
          this.respuesta.msj = 'No se encuentra ningun cliente con la cedula ' +  this.selectedPersona.cedula;
          console.log('NO SE ENCUENTRA');
        } else {
          this.selectedPersona = JSON.parse(JSON.stringify(cliente));
          this.selectedPersona.fecha_nacimiento = this.clienteService.formatoFecha(this.selectedPersona.fecha_nacimiento);
          this.municipioService.buscarMunicipio(cliente['municipio_id'])
          .subscribe(mun => {
              console.log('DEPTOOOOOO !!!!!!!!!!!' + mun['departamento_id']);
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

      if (this.listaDepartamentos === undefined) {
          this.listandoDepartamentos = false;
      } else {
        this.listandoDepartamentos = true;
      }
    });
  }

  listarMunicipios() {
    this.municipioService.listarMunicipios(this.selectedDepartamento.id).
    subscribe(municipio => {
      this.listaMunicipios = municipio;

      if (this.listaMunicipios === undefined) {
          this.listandoMunicipios = false;
      } else {
        this.listandoMunicipios = true;
      }
    });
  }

  validarCampos(): boolean {
    if (this.selectedPersona.nombre == null || this.selectedPersona.apellido == null
      || this.selectedPersona.cedula == null || this.selectedPersona.telefono == null
      || this.selectedLogin.username == null || this.selectedLogin.contrasenia == null) {
        return false;
    } else {
      return true;
    }
  }

  editar() {

    if (this.validarCampos() === false) {
      this.respuesta.msj = 'Debe ingresar todos los campos obligatorios';
      this.show = 1;

      this.editado = false;
    } else {
      this.rol.id = 3;
      this.selectedPersona.rol_id = this.rol;
      this.selectedPersona.activo = 1;
      this.selectedLogin.activo = 1;
      this.selectedPersona.municipio_id = this.selectedMunicipio;
      this.selectedLogin.persona_cedula = this.selectedPersona;
      this.clienteService.editarPersona(this.selectedLogin)
      .subscribe(res => {
        this.respuesta = JSON.parse(JSON.stringify(res));
        console.log(this.respuesta.msj + ' UPDATE');
        console.log(this.selectedPersona.nombre);
        if (this.respuesta.id === 404) {
          this.show = 1;
          this.editado = false;
        } else {
          this.show = 2;
          this.editado = true;
        }
      });
    }
  }
}
