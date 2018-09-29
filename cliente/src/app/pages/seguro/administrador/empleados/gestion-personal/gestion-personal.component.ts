import { EmpleadoDTO } from './../../../../../modelo/dto/empleadoDTO';
import { EmpleadoService } from './../../../../../services/empleado/empleado.service';
import { ClienteService } from './../../../../../services/cliente/cliente.service';
import { Departamento } from './../../../../../modelo/departamento';
import { Municipio } from './../../../../../modelo/municipio';
import { MunicipioService } from './../../../../../services/municipio/municipio.service';
import { Rol } from './../../../../../modelo/rol';
import { TipoPersonal } from './../../../../../modelo/tipo_personal';
import { Persona } from './../../../../../modelo/persona';
import { Router } from '@angular/router';
import { RespuestaDTO } from './../../../../../modelo/respuestaDTO';
import { Login } from './../../../../../modelo/login';
import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../../../../modelo/empleado';

@Component({
  selector: 'app-gestion-personal',
  templateUrl: './gestion-personal.component.html',
  styleUrls: ['./gestion-personal.component.css']
})
export class GestionPersonalComponent implements OnInit {

  campoFiltro = '';
  show = 0;
  contador = 0;
  empleadoDTO: EmpleadoDTO = new EmpleadoDTO();
  listaEmpleados: EmpleadoDTO[];
  listaTipoPersonal: TipoPersonal[];

  cedulaBuscar: string;
  tipoPersonalSeleccionado: TipoPersonal = new TipoPersonal();
  selectedPersona: Persona = new Persona();
  selectedLogin: Login = new Login();
  selectedEmpleado: Empleado = new Empleado();
  rol: Rol = new Rol();
  respuesta: RespuestaDTO = new RespuestaDTO();
  listaMunicipios: Municipio[];
  listaDepartamentos: Departamento[];
  selectedMunicipio: Municipio = new Municipio();
  selectedDepartamento: Departamento = new Departamento();


  constructor(private clienteService: ClienteService , private empleadoService: EmpleadoService,  private router: Router ,
    private municipioService: MunicipioService) {
      this.listarTipoPersonal();
      this.listarDepartamentos();
      this.listarEmpleados();
      this.selectedDepartamento.id = 0;
      this.selectedMunicipio.id = 0;
      this.selectedPersona.genero = 0;
      this.tipoPersonalSeleccionado.id = 0;
  }

  ngOnInit() {
  }

  conteo() {
this.contador++;
  }

  registrar() {

    if (this.validarCampos()) {
      this.show = 1;
          this.respuesta.msj = 'Debe completar todos los campos';
    } else {
      this.empleadoDTO.nombre = this.selectedPersona.nombre;
      this.empleadoDTO.apellido = this.selectedPersona.apellido;
      this.empleadoDTO.cedula = this.selectedPersona.cedula;
      this.empleadoDTO.correo = this.selectedPersona.correo;
      this.empleadoDTO.fecha_nacimiento = this.selectedPersona.fecha_nacimiento;
      this.empleadoDTO.direccion = this.selectedPersona.direccion;
      this.empleadoDTO.telefono = this.selectedPersona.telefono;
      this.empleadoDTO.rol_id = 2;
      this.empleadoDTO.municipio_id = this.selectedMunicipio.id;
      this.empleadoDTO.genero = this.selectedPersona.genero;
      this.empleadoDTO.username = this.selectedLogin.username;
      this.empleadoDTO.contrasenia = this.selectedLogin.contrasenia;
      this.empleadoDTO.tipo_id = this.tipoPersonalSeleccionado.id;
      /**this.selectedPersona.rol_id = this.rol;
      this.selectedPersona.municipio_id = this.selectedMunicipio;
      this.selectedLogin.persona_cedula = this.selectedPersona;
      this.selectedEmpleado.persona_cedula = this.selectedPersona;
      this.selectedEmpleado.tipo_id = this.tipoPersonalSeleccionado;*/
      console.log(this.empleadoDTO);
      this.empleadoService.registrarEmpleado(this.empleadoDTO)
      .subscribe(res => {
        this.respuesta = JSON.parse(JSON.stringify(res));
        console.log(this.respuesta.msj + ' SAVE');
        console.log(this.selectedPersona.nombre);
        this.limpiarCampos();
        this.show = 2;
        this.listarEmpleados();
      });
    }
  }

  buscar() {

       if (this.cedulaBuscar == null) {
        this.show = 1;
        this.respuesta.msj = 'Debe ingresar la cedula a buscar';
      } else {
         this.empleadoService.buscarEmpleado(this.cedulaBuscar)
         .subscribe(empleado => {
           if (empleado === undefined ) {
             this.respuesta.msj = 'No se encuentra ningun empleado con la cedula ' +  this.cedulaBuscar;
             console.log('NO SE ENCUENTRA');
             this.limpiarCampos();
           } else {
              console.log(empleado);
              this.empleadoDTO = empleado;

              /** Inicio del machete serio */
              this.selectedPersona.nombre = this.empleadoDTO.nombre;
              this.selectedPersona.apellido = this.empleadoDTO.apellido;
              this.selectedPersona.cedula = this.empleadoDTO.cedula;
              this.selectedPersona.correo = this.empleadoDTO.correo;
              this.selectedPersona.fecha_nacimiento = this.empleadoDTO.fecha_nacimiento;
              this.selectedPersona.direccion = this.empleadoDTO.direccion;
              this.selectedPersona.telefono = this.empleadoDTO.telefono;
             // this.empleadoDTO.rol_id = 3;
              this.selectedDepartamento.id = 1;
              this.selectedMunicipio.id = this.empleadoDTO.municipio_id;
              this.selectedPersona.genero = this.empleadoDTO.genero;
              this.selectedLogin.username = this.empleadoDTO.username;
              this.selectedLogin.contrasenia = this.empleadoDTO.contrasenia;
              this.tipoPersonalSeleccionado.id = this.empleadoDTO.tipo_id;
              /** Fin del machete serio */

             }
           });
       }
     }

limpiarCampos() {
  this.selectedPersona = new Persona();
  this.selectedLogin = new Login();
  this.selectedEmpleado = new Empleado();
  this.selectedMunicipio.id = 0;
  this.selectedDepartamento.id = 0;
  this.listaMunicipios = [];
  this.tipoPersonalSeleccionado.id = 0;
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

  listarTipoPersonal() {
    this.empleadoService.listarTipoPersonal()
    .subscribe(tipoPersonal => {
      this.listaTipoPersonal = tipoPersonal;
    });
  }

  listarEmpleados() {
    this.empleadoService.listarEmpleados()
    .subscribe(empleados => {
      this.listaEmpleados = empleados;
    });
  }

  eliminar (empleado: EmpleadoDTO) {

    if (confirm('¿ Estas seguro que quieres eliminarlo ?')) {
      empleado.activo = 0;
      this.empleadoService.eliminarEmpleado(empleado)
      .subscribe(res => {
        this.respuesta = JSON.parse(JSON.stringify(res));
        console.log(this.respuesta.msj + ' DELETE');
        this.show = 2;
        this.listarEmpleados();
      });
    }
  }

  ver(empleado: EmpleadoDTO) {
    this.cedulaBuscar = empleado.cedula;
    this.buscar();
  }

  editar() {

    if (this.validarCampos()) {
      this.show = 1;
          this.respuesta.msj = 'Debe completar todos los campos';

    } else {
      this.empleadoService.editarEmpleado(this.empleadoDTO)
      .subscribe(res => {
        this.respuesta = JSON.parse(JSON.stringify(res));
        console.log(this.respuesta.msj + ' EDIT');
        this.limpiarCampos();
        this.show = 2;
      });
    }
}

}

