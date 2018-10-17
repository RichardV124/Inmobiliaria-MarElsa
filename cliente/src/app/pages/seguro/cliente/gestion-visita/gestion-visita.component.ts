import { Visita } from './../../../../modelo/visita';
import { VisitaService } from './../../../../services/visita/visita.service';
import { LoginService } from './../../../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/modelo/login';
import { RespuestaDTO } from 'src/app/modelo/respuestaDTO';

@Component({
  selector: 'app-gestion-visita',
  templateUrl: './gestion-visita.component.html',
  styleUrls: ['./gestion-visita.component.css']
})
export class GestionVisitaComponent implements OnInit {

  user: Login = new Login();
  selectedVisita: Visita = new Visita();
  show: number;
  respuesta: RespuestaDTO = new RespuestaDTO();
  visitasSinConfirmar: Visita[];
  visitasConfirmadas: Visita[];
  dateToday: string;

  constructor(private visitaService: VisitaService, private loginService: LoginService) {
    this.loginService.esAccesible('gestion-visita');
    this.user = this.loginService.getUsuario();
    this.llenarTablas();
    this.capturarFechaActual();
    this.show = 0;
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
    console.log(new Date (this.dateToday) + 'fecha HPTA!!!!!!!!!!!!!!');
  }

  /**
   * Método para cerrar el mensaje emergente de los formularios
   */
  cerrarMsj() {
    this.show = 0;
  }

  /**
   * Método para validar los datos del formulario de solicitud de visitas
   */
  validarCampos(): boolean {
    if (this.selectedVisita.descripcion == null || this.selectedVisita.fecha == null
      || this.selectedVisita.hora === 0  || new Date(this.selectedVisita.fecha) <= new Date(this.dateToday)) {
        return false;
    }
    return true;
  }

  /**
   * Método para registrar una visita en la bd
   */
  registrar() {
    // validamos los campos
    if (this.validarCampos() === false) {
      console.log(this.selectedVisita.fecha);
      this.respuesta.msj = 'Debe ingresar todos los campos obligatorios y/o revisar la fecha';
      this.show = 1;
    } else {
      // Asignamos el estado inicial de la visita, siendo 0 Solicitada
      this.selectedVisita.estado = 0;
      // Asignamos el tipo de visita, en este caso es por defecto una solicitud de registro de inmueble
      this.selectedVisita.tipo_visita = 'Registro de inmueble';
      // le asignamos el cliente a la visita
      this.selectedVisita.cliente_cedula = this.user.persona_cedula;
      // llamamos el servicio de registro de visita del cliente
      this.visitaService.registrarVisitaCliente(this.selectedVisita)
              .subscribe(res => {
                this.respuesta = JSON.parse(JSON.stringify(res));
                console.log(this.respuesta.msj + ' SAVE ');
                this.selectedVisita = new Visita();
                // verificamos si la respuesta del servicio es positiva o negativa
                if (this.respuesta.id === 404) {
                  this.show = 1;
                } else {
                  this.show = 2;
                  this.llenarTablas();
                }
      });
    }
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
    this.llenarTablas();
  }

  /**
   * Método para llenar las tablas de visitas Sin confirmar y de visitas confirmadas
   */
  llenarTablas () {
    this.visitaService.listarVisitasPorClienteAndEstado(this.user.persona_cedula.cedula, 0)
              .subscribe(res => {
                for (const visita of res) {
                  visita.fecha = this.visitaService.formatoFecha(visita.fecha);
                }
                this.visitasSinConfirmar = res;
      });

    this.visitaService.listarVisitasPorClienteAndEstado(this.user.persona_cedula.cedula, 1)
        .subscribe(res => {
          for (const visit of res) {
            visit.fecha = this.visitaService.formatoFecha(visit.fecha);
          }
          this.visitasConfirmadas = res;
      });
  }

}
