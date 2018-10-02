import { Departamento } from './../../../modelo/departamento';
import { Municipio } from './../../../modelo/municipio';
import { Rol } from './../../../modelo/rol';
import { RespuestaDTO } from './../../../modelo/respuestaDTO';
import { Login } from './../../../modelo/login';
import { Cliente } from './../../../modelo/cliente';
import { ClienteService } from './../../../services/cliente/cliente.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MunicipioService } from '../../../services/municipio/municipio.service';
import { Persona } from '../../../modelo/persona';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {

  selectedPersona: Persona = new Persona();
  selectedLogin: Login = new Login();
  rol: Rol = new Rol();
  respuesta: RespuestaDTO = new RespuestaDTO();
  listaMunicipios: Municipio[];
  listaDepartamentos: Departamento[];
  selectedMunicipio: Municipio = new Municipio();
  selectedDepartamento: Departamento = new Departamento();
  show: number;
  validacionLogin: Login = new Login();

  // Variables para verificar los metodos
    registrado = false;
    listandoDepartamentos = false;
    listandoMunicipios = false;

  // ------------------------------------

  constructor(private clienteService: ClienteService, private router: Router,
    private municipioService: MunicipioService) {
    this.listarDepartamentos();
    this.selectedDepartamento.id = 0;
    this.selectedMunicipio.id = 0;
    this.selectedPersona.genero = 0;
    this.show = 0;
   }

  ngOnInit() {
  }

  cerrarMsj() {
    this.show = 0;
  }

  validarRegistro(): boolean {
    return this.registrado;
  }

  validarListarDepartamento(): boolean {
    return this.listandoDepartamentos;
  }

  validarListarMunicipios(): boolean {
    return this.listandoMunicipios;
  }

  validarCampos(): boolean {
    if (this.selectedPersona.nombre == null || this.selectedPersona.apellido == null
      || this.selectedPersona.cedula == null || this.selectedPersona.telefono == null
      || this.selectedLogin.username == null || this.selectedLogin.contrasenia == null
      || this.selectedMunicipio.id === 0) {
        return false;
    } else {
      return true;
    }
  }

  registrar() {

    if (this.validarCampos() === false) {
      this.respuesta.msj = 'Debe ingresar todos los campos obligatorios';
      this.show = 1;
      this.registrado = false;
    } else {
              // debemos buscar el login por cedula
              this.rol.id = 3;
              this.selectedPersona.rol_id = this.rol;
              //  Dejamos el Login y la Persona activos en el sistema
              this.selectedLogin.activo = 1;
              this.selectedPersona.activo = 1;
              this.selectedPersona.municipio_id = this.selectedMunicipio;
              this.selectedLogin.persona_cedula = this.selectedPersona;
              this.clienteService.registrarPersona(this.selectedLogin)
              .subscribe(res => {
                this.respuesta = JSON.parse(JSON.stringify(res));
                console.log(this.respuesta.msj + ' SAVE');
                console.log(this.selectedPersona.nombre);
                this.selectedPersona = new Persona();
                this.selectedLogin = new Login();
                // variable de verificacion
                this.registrado = true;
                if (this.respuesta.id === 404) {
                  this.show = 1;
                } else {
                  this.show = 2;
                }
              });
    }
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
    this.selectedMunicipio.id = 0;
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
}
