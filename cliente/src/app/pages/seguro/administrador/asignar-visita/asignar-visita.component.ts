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

  constructor(private visitaService: VisitaService, private empleadoService: EmpleadoService, private usuarioServicio: LoginService) {
    this.visitaSeleccionada.id = 0;
    this.empleadoDTO.cedula = 0;
    this.listarVisitas();
    this.listarEmpleados();

     // Validamos si el usuario tiene acceso a la pagina
     this.usuarioServicio.esAccesible('asignar-visita');

   }

  ngOnInit() {
  }

  listarVisitas() {
    this.visitaService.listarVisitasPorEstado(1)
    .subscribe(visitas => {
      console.log(visitas);
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
  }

  asignar () {

    this.persona.cedula = this.empleadoDTO.cedula;
    this.empleado.persona_cedula = this.persona;
    this.visitaSeleccionada.empleado_cedula = this.empleado;
    console.log(this.visitaSeleccionada);

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
              }
            });
    }
}
