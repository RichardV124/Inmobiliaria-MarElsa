import { Visita } from './../../../../modelo/visita';
import { RespuestaDTO } from './../../../../modelo/respuestaDTO';
import { Login } from 'src/app/modelo/login';
import { VisitaService } from './../../../../services/visita/visita.service';
import { LoginService } from './../../../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Visita } from '../../../../modelo/visita';

@Component({
  selector: 'app-ver-visitas',
  templateUrl: './ver-visitas.component.html',
  styleUrls: ['./ver-visitas.component.css']
})
export class VerVisitasComponent implements OnInit {

  user: Login = new Login();
  // Lista de visitas pendientes que ya estan confirmadas de el empleado logeado
  listaVisitasPendientes: Visita[];
   // Lista de visitas atendidas que ya estan confirmadas de el empleado logeado
   listaVisitasAtendidas: Visita[];
  respuesta: RespuestaDTO = new RespuestaDTO();
  show;

  constructor(private visitaService: VisitaService, private loginService: LoginService) {
    this.loginService.esAccesible('ver-visitas');
    this.user = this.loginService.getUsuario();
    this.show = 0;
    this.llenarTablas();
   }

  ngOnInit() {
  }

  llenarTablas() {

    // Cargamos la lista de visitas pendientes
    this.visitaService.listarVisitasPorEmpleadoAndEstado(this.user.persona_cedula.cedula, 1)
      .subscribe(res => {
        for (const visita of res) {
         visita.fecha = this.visitaService.formatoFecha(visita.fecha);
      }
        this.listaVisitasPendientes = res;
    });

    // Cargamos la lista de visitas atendidas
    this.visitaService.listarVisitasPorEmpleadoAndEstado(this.user.persona_cedula.cedula, 2)
      .subscribe(res => {
        for (const visita of res) {
        visita.fecha = this.visitaService.formatoFecha(visita.fecha);
      }
        this.listaVisitasAtendidas = res;
    });
  }

  /**
   * Metodo para eliminar una visita
   * @param v, Visita a elminar
   */
  eliminar (id: number) {
    this.visitaService.eliminar(id)
    .subscribe(res => {
      this.respuesta = JSON.parse(JSON.stringify(res));
      this.llenarTablas();
    });
}

atender (v: Visita) {

  console.log(v);
  v.estado = 2;
  this.visitaService.atenderVisita(v)
          .subscribe(res => {
            this.respuesta = JSON.parse(JSON.stringify(res));
            if (this.respuesta.id == 600) {
              this.show = 1;
            } else {
            this.show = 2;
            this.llenarTablas();
            }
          });
  }

}
