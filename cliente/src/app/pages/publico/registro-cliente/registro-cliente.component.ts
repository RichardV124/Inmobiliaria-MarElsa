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
  validacionLogin: Login = new Login();
  // bandera para control de mensaje. Valores 1(negativo) 2 (positivo)
  show: number;
  // variable para la ubicacion en el mapa
  latitudDefecto = 4.540130;
  longitudDefecto = -75.665193;
  marcadorAgregado = false;

  // Variables para verificar los metodos
    registrado = false;
    listandoDepartamentos = false;
    listandoMunicipios = false;

  // ------------------------------------

  constructor(private clienteService: ClienteService, private router: Router,
    private municipioService: MunicipioService) {
    this.listarDepartamentos();
    // inicializamos los valores por defecto
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

  /**
   * metodo para validar los campos del formulario de registro
   */
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

  /**
   * Metodo para validar que se ingrese la ubicacion del inmueble en el mapa
   */
  validarUbicacionInmueble() {
    if (!this.marcadorAgregado) {
        this.respuesta.msj = 'Debe agregar la ubicación del inmueble';
        this.show = 1;
        return false;
    }
    return true;
  }

  /**
   * Metodo para registrar un cliente en la BD
   */
  registrar() {

    if (this.validarCampos() === false) {
      this.respuesta.msj = 'Debe ingresar todos los campos obligatorios';
      this.show = 1;
      this.registrado = false;
    } else {
              // Asignamos el rol 3 (Cliente)
              this.rol.id = 3;
              this.selectedPersona.rol_id = this.rol;
              //  Dejamos el Login y la Persona activos en el sistema
              this.selectedLogin.activo = 1;
              this.selectedPersona.activo = 1;
              this.selectedPersona.municipio_id = this.selectedMunicipio;
              this.selectedLogin.persona_cedula = this.selectedPersona;
              // registramos el cliente
              this.clienteService.registrarPersona(this.selectedLogin)
              .subscribe(res => {
                this.respuesta = JSON.parse(JSON.stringify(res));
                // variable de verificacion
                this.registrado = true;
                // validamos la respuesta del servidor
                if (this.respuesta.id === 404) {
                  this.show = 1;
                } else {
                  this.show = 2;
                  this.limpiarCampos();
                }
              });
    }
  }

  limpiarCampos() {
    this.selectedPersona = new Persona();
    this.selectedLogin = new Login();
    this.marcadorAgregado = false;
  }

  /**
   * Metodo que litsa todos los dptos de la BD
   */
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

  /**
   * MEtodo que lista los municipios de la base de datos por el dpto seleccionado
   */
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

  /**
   *  metodo que controla el evento de marcadores en el mapa
   **/
  onChoseLocation(event) {
    this.selectedPersona.latitud = event.coords.lat;
    this.selectedPersona.longitud = event.coords.lng;
    this.marcadorAgregado = true;
  }
}
