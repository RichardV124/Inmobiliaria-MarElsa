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

  constructor(private clienteService: ClienteService, private router: Router,
    private municipioService: MunicipioService) {
    this.listarDepartamentos();
    this.selectedDepartamento.id = 0;
    this.selectedMunicipio.id = 0;
    this.selectedPersona.genero = 0;
   }

  ngOnInit() {
  }

  validarCampos(): boolean {
    if (this.selectedPersona.nombre == null || this.selectedPersona.apellido == null
      || this.selectedPersona.fecha_nacimiento == null || this.selectedPersona.cedula == null
      || this.selectedPersona.telefono == null || this.selectedPersona.direccion == null
      || this.selectedPersona.correo == null || this.selectedLogin.username || this.selectedLogin.contrasenia) {
        return false;
    } else {
      return true;
    }
  }

  registrar() {

    if (this.validarCampos()) {
    } else {
      this.rol.id = 3;
      this.selectedPersona.rol_id = this.rol;
      // this.selectedPersona.activo = 1;
      this.selectedPersona.municipio_id = this.selectedMunicipio;
      this.selectedLogin.persona_cedula = this.selectedPersona;
      this.clienteService.registrarPersona(this.selectedLogin)
      .subscribe(res => {
        this.respuesta = JSON.parse(JSON.stringify(res));
        console.log(this.respuesta.msj + ' SAVE');
        console.log(this.selectedPersona.nombre);
        this.selectedPersona = new Persona();
        this.selectedLogin = new Login();
      });
    }
  }

  listarDepartamentos() {
    this.municipioService.listarDepartamentos().
    subscribe(departamento => {
      this.listaDepartamentos = departamento;
    });
  }

  listarMunicipios() {
    this.selectedMunicipio.id = 0;
    this.municipioService.listarMunicipios(this.selectedDepartamento.id).
    subscribe(municipio => {
      this.listaMunicipios = municipio;
    });
  }
}
