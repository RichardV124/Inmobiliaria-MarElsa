import { LoginService } from './../../../../services/login/login.service';
import { Persona } from './../../../../modelo/persona';
import { EmpleadoService } from './../../../../services/empleado/empleado.service';
import { EmpleadoDTO } from './../../../../modelo/dto/empleadoDTO';
import { RespuestaDTO } from './../../../../modelo/respuestaDTO';
import { VisitaService } from './../../../../services/visita/visita.service';
import { Visita } from './../../../../modelo/visita';
import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../../../modelo/empleado';

@Component({
  selector: 'app-asignar-visita',
  templateUrl: './asignar-visita.component.html',
  styleUrls: ['./asignar-visita.component.css']
})
export class AsignarVisitaComponent implements OnInit {

  // Lista de visitas que estan pendientes por asignar
  listaVisitas: Visita[];
  visitaSeleccionada: Visita = new Visita();
  empleadoDTO: EmpleadoDTO = new EmpleadoDTO();
  listaEmpleados: EmpleadoDTO[];
  respuesta: RespuestaDTO = new RespuestaDTO();
  empleado: Empleado = new Empleado();
  persona: Persona = new Persona();
  horaSeleccionada = 0;
  show;
  mostrarEmpleados = 0;
  dateToday: string;

  constructor(private visitaService: VisitaService, private empleadoService: EmpleadoService, private usuarioServicio: LoginService) {
    // Validamos si el usuario tiene acceso a la pagina
    this.usuarioServicio.esAccesible('asignar-visita');
    this.visitaSeleccionada.id = 0;
    this.visitaSeleccionada.hora = 0;
    this.empleadoDTO.cedula = 0;
    this.listarVisitas();
    this.listarEmpleados();
    this.capturarFechaActual();
   }

  ngOnInit() {
  }

   /**
   * Método para capturar y convertir la fecha actual
   */
  capturarFechaActual () {
    const today = new Date();
    const hoy = Date;
    this.dateToday = today.getFullYear() + '-' + (((today.getMonth() + 1) < 10) ? '0' : '') +
     (today.getMonth() + 1) + '-' + ((today.getDate() < 10) ? '0' : '') + today.getDate();
  }

  listarVisitas() {
    this.visitaService.listarVisitasPorEstado(0)
    .subscribe(visitas => {
      for (const visita of visitas) {
        visita.fecha = this.visitaService.formatoFecha(visita.fecha);
      }
      this.listaVisitas = visitas;
    });
  }

  listarEmpleados() {
    this.empleadoService.listarEmpleados()
    .subscribe(empleados => {
      this.listaEmpleados = empleados;
    });
  }

  cerrarMsj() {
    this.show = 0;
  }

  eliminar(v) {
  }

  ver(v) {
      this.mostrarEmpleados = 1 ;
      this.visitaSeleccionada = v;
      this.visitaSeleccionada.fecha = this.visitaService.formatoFecha(this.visitaSeleccionada.fecha);
  }
  /**
  * Valida si la hora a asignar no esta disponible
  * Retorna false si no esta disponible, true si esta disponible
  * @param visitasFecha, la lista de visitas asignadas al empleado seleccionado
  */
  validarHora(visitasFecha) {

    for (const visita of visitasFecha) {
      // if (visita.hora === this.visitaSeleccionada.hora || visita.hora === (this.visitaSeleccionada.hora - 1)
      // || visita.hora === (this.visitaSeleccionada.hora + 1) ) {
        if (visita.hora === this.visitaSeleccionada.hora ) {
        return false;
      }
    }
   return true;
  }

  asignar () {

    // validamos los campos
    if (this.validarCampos() === false || this.visitaSeleccionada.id === null || this.empleadoDTO.cedula === 0 ) {
      console.log(this.visitaSeleccionada.fecha);
      this.respuesta.msj = 'Debe ingresar todos los campos obligatorios y/o revisar la fecha';
      this.show = 1;
    } else {
    // le asignamos el empleado a la visita
    this.persona.cedula = this.empleadoDTO.cedula;
    this.empleado.persona_cedula = this.persona;
    this.visitaSeleccionada.empleado_cedula = this.empleado;
    console.log(this.visitaSeleccionada);

    // Cargamos la lista de visitas del empleado en esa fecha
    this.visitaService.listarVisitasPorEmpleadoAndFecha(this.empleadoDTO.cedula, this.visitaSeleccionada.fecha)
      .subscribe(visitasFecha => {
       if (this.validarHora(visitasFecha)) {
    // llamamos el servicio de asignar visita al empleado
    this.visitaService.asignarVisita(this.visitaSeleccionada)
            .subscribe(res => {
              this.respuesta = JSON.parse(JSON.stringify(res));
              if (this.respuesta.id == 600) {
                this.show = 1;
              } else {
                this.visitaSeleccionada = new Visita();
                this.empleado = new Empleado();
                this.persona = new Persona();
              this.show = 2;
              this.mostrarEmpleados = 0 ;
              this.listarVisitas();
              }
            });
       } else {
         this.respuesta.msj = 'La hora seleccionada no esta disponible';
         this.show = 1;
       }
    });
  }
}

     /**
   * Método para validar los datos del formulario de solicitud de visitas
   */
  validarCampos(): boolean {
    if (this.visitaSeleccionada.fecha == null || this.visitaSeleccionada.hora === 0
      || new Date(this.visitaSeleccionada.fecha) <= new Date(this.dateToday)) {
        return false;
    }
    return true;
  }
}
