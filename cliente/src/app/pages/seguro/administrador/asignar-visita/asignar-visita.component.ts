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
  respuesta: RespuestaDTO;
  horaSeleccionada = 0;
  show;
  mostrarEmpleados = 0;

  constructor(private visitaService: VisitaService, private empleadoService: EmpleadoService) {
    this.visitaSeleccionada.id = 0;
    this.empleadoDTO.cedula = 0;
    this.listarVisitas();
    this.listarEmpleados();

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
    let empleado : Empleado = new Empleado();
    let persona : Persona = new Persona();
    persona.cedula = this.empleadoDTO.cedula;
  empleado.persona_cedula = persona;
this.visitaSeleccionada.empleado_cedula = empleado;
console.log(this.visitaSeleccionada);

    // this.rolService.asignarAcceso(this.accesoRol)
    //         .subscribe(res => {
    //           this.respuesta = JSON.parse(JSON.stringify(res));
    //           if (this.respuesta.id == 600) {
    //             this.show = 1;
    //             this.regAcceso = false;
    //           } else {
    //               this.rolSeleccionado = new Rol();
    //               this.accesoSeleccionado = new Acceso();
    //               this.accesoRol = new AccesoRol();
    //           this.show = 2;
    //           this.regAcceso = true;
    //           this.listarAccesosRol();
    //           }
    //         });
    }
}
