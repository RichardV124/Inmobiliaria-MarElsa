import { LoginService } from './../../../../../services/login/login.service';
import { Estudio } from './../../../../../modelo/estudio';
import { Experiencia } from './../../../../../modelo/experiencia';
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
import { ExperienciaService } from '../../../../../services/experiencia/experiencia.service';
import { DatePipe } from '@angular/common';

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
   // Listado de estudios de un empleado
   listaEstudios: Array<Estudio> = [];
   // Listado de Experiencias de un empleado
   listaExperiencias: Array<Experiencia> = [];

  cedulaBuscar: string;
  tipoPersonalSeleccionado: TipoPersonal = new TipoPersonal();
  selectedPersona: Persona = new Persona();
  selectedLogin: Login = new Login();
  selectedEmpleado: Empleado = new Empleado();
  /**Experiencias y Estudios*/
  experienciaSeleccionada: Experiencia = new Experiencia();
  estudioSeleccionado: Estudio = new Estudio();

  rol: Rol = new Rol();
  respuesta: RespuestaDTO = new RespuestaDTO();
  listaMunicipios: Municipio[];
  listaDepartamentos: Departamento[];
  selectedMunicipio: Municipio = new Municipio();
  selectedDepartamento: Departamento = new Departamento();


  constructor(private clienteService: ClienteService , private empleadoService: EmpleadoService,  private router: Router ,
    private municipioService: MunicipioService, private experienciaService: ExperienciaService, private usuarioServicio: LoginService) {
      this.listarTipoPersonal();
      this.listarDepartamentos();
      this.listarEmpleados();
      this.selectedDepartamento.id = 0;
      this.selectedMunicipio.id = 0;
      this.selectedPersona.genero = 0;
      this.tipoPersonalSeleccionado.id = 0;
       // Validamos si el usuario tiene acceso a la pagina
     this.usuarioServicio.esAccesible('gestion-personal');
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

  registrarExperiencia() {

    if (this.validarCamposExperiencias()) {
      this.show = 1;
          this.respuesta.msj = 'Debe completar todos los campos';
    } else {
      this.experienciaSeleccionada.persona_cedula = this.selectedPersona;
      console.log(this.experienciaSeleccionada);
      this.experienciaService.registrarExperiencia(this.experienciaSeleccionada)
      .subscribe(res => {
        this.respuesta = JSON.parse(JSON.stringify(res));
        console.log(this.respuesta.msj + ' SAVE');
        console.log(this.experienciaSeleccionada.cargo);
        this.listarExperienciasEmpleado(this.experienciaSeleccionada.persona_cedula.cedula);
        this.limpiarCampos();
        this.show = 2;
      });
    }
  }

  registrarEstudio() {

    if (this.validarCamposEstudios()) {
      this.show = 1;
          this.respuesta.msj = 'Debe completar todos los campos';
    } else {
      this.estudioSeleccionado.persona_cedula = this.selectedPersona;
      console.log(this.estudioSeleccionado);
      this.experienciaService.registrarEstudio(this.estudioSeleccionado)
      .subscribe(res => {
        this.respuesta = JSON.parse(JSON.stringify(res));
        console.log(this.respuesta.msj + ' SAVE');
        console.log(this.estudioSeleccionado.descripcion);
        this.listarEstudiosEmpleado(this.estudioSeleccionado.persona_cedula.cedula);
        this.limpiarCampos();
        this.show = 2;
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
             this.municipioService.buscarMunicipio(this.empleadoDTO.municipio_id)
             .subscribe(mun => {
                 console.log('DEPTOOOOOO!!!!!!!!!!!!' + mun['departamento_id']);
                 this.selectedDepartamento.id = mun['departamento_id'];
                 this.listarMunicipios();
                 this.selectedMunicipio = mun;
               });
              this.selectedPersona.genero = this.empleadoDTO.genero;
              this.selectedLogin.username = this.empleadoDTO.username;
              this.selectedLogin.contrasenia = this.empleadoDTO.contrasenia;
              this.tipoPersonalSeleccionado.id = this.empleadoDTO.tipo_id;
              /** Fin del machete serio */

              /** Listamos las experiencias del empleado buscado */
              this.listarExperienciasEmpleado(this.selectedPersona.cedula);
              this.listarEstudiosEmpleado(this.selectedPersona.cedula);
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
  this.tipoPersonalSeleccionado.id = 0;
  this.listaEstudios = [];
  this.listaExperiencias = [];
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

  validarCamposExperiencias(): boolean {
    if (this.experienciaSeleccionada.fecha_inicio == null || this.experienciaSeleccionada.fecha_fin == null
      || this.experienciaSeleccionada.cargo == null || this.experienciaSeleccionada.nombre_certificado == null
      || this.experienciaSeleccionada.telefono == null || this.experienciaSeleccionada.direccion == null) {
        return false;
    } else {
      return true;
    }
  }

  validarCamposEstudios(): boolean {
    if (this.estudioSeleccionado.descripcion == null || this.estudioSeleccionado.institucion == null ||
      this.estudioSeleccionado.nombre_certificado == null || this.estudioSeleccionado.telefono == null ||
       this.experienciaSeleccionada.direccion == null) {
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
      this.empleadoService.eliminarEmpleado(empleado)
      .subscribe(res => {
        this.respuesta = JSON.parse(JSON.stringify(res));
        console.log(this.respuesta.msj + ' DELETE');
        this.show = 2;
        this.listarEmpleados();
      });
    }
  }

  eliminarExperiencia (experiencia: Experiencia) {
    const cedula = experiencia.persona_cedula;
    if (confirm('¿ Estas seguro que quieres eliminarlo ?')) {
      this.experienciaService.eliminarExperiencia(experiencia)
      .subscribe(res => {
        this.respuesta = JSON.parse(JSON.stringify(res));
        console.log(this.respuesta.msj + ' DELETE');
        this.show = 2;
        console.log(experiencia);
        this.listarExperienciasEmpleado(cedula);
      });
    }
  }

  eliminarEstudio (estudio: Estudio) {
    const cedula = estudio.persona_cedula;
    if (confirm('¿ Estas seguro que quieres eliminarlo ?')) {
      this.experienciaService.eliminarEstudio(estudio)
      .subscribe(res => {
        this.respuesta = JSON.parse(JSON.stringify(res));
        console.log(this.respuesta.msj + ' DELETE');
        this.show = 2;
        this.listarEstudiosEmpleado(cedula);
      });
    }
  }

  ver(empleado: EmpleadoDTO) {
    this.cedulaBuscar = empleado.cedula;
    this.buscar();
  }

  verEstudio(estudio: Estudio) {
    this.experienciaService.buscarEstudio(estudio.id)
         .subscribe(est => {
              console.log(est);
              this.estudioSeleccionado = est;
           });
  }

  verExperiencia(experiencia: Experiencia) {
    this.experienciaService.buscarExperiencia(experiencia.id)
    .subscribe(exper => {
         console.log(exper);
         this.experienciaSeleccionada = exper;
      });
  }

  listarExperienciasEmpleado(cedula: any) {
    this.experienciaService.listarExperiencias(cedula)
    .subscribe(experiencias => {
         console.log(experiencias);
         this.listaExperiencias = experiencias;
      });
  }

  listarEstudiosEmpleado(cedula: any) {
    this.experienciaService.listarEstudios(cedula)
    .subscribe(estudios => {
         console.log(estudios);
         this.listaEstudios = estudios;
      });
  }

  editar() {

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

