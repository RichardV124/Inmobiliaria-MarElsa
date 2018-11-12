import { Arriendo } from './../../../../../modelo/arriendo';
import { Municipio } from 'src/app/modelo/municipio';
import { Departamento } from './../../../../../modelo/departamento';
import { TipoInmueble } from './../../../../../modelo/tipo_inmueble';
import { Login } from 'src/app/modelo/login';
import { Inmueble } from './../../../../../modelo/inmueble';
import { Persona } from './../../../../../modelo/persona';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionArriendoComponent } from './gestion-arriendo.component';

import {
  BaseRequestOptions,
  Response,
  ResponseOptions,
  Http,
  HttpModule

} from '@angular/http';
import { Inject } from '@angular/core';
import { Visita } from 'src/app/modelo/visita';

describe('GestionArriendoComponent', () => {
  let component: GestionArriendoComponent;
  let fixture: ComponentFixture<GestionArriendoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpClientModule],
      declarations: [ GestionArriendoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionArriendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  // /**
  //  * METODOS DEL CRUD
  //  */

  // fit('Registrar arriendo sin buscar inmueble y cliente', () => {

  //   // creamos el empleado
  //    // tslint:disable-next-line:prefer-const
  //   let login = new Login();
  //    // tslint:disable-next-line:prefer-const
  //   let persona = new Persona();
  //   persona.cedula = 1234;
  //   login.persona_cedula = persona;
  //   component.usuario = login;

  //   // creamos la visita
  //   component.selectedVisita = new Visita();

  //   // Creamos el arriendo
  //   component.selectedArriendo.cliente_cedula = component.selectedPersona.cedula;

  //   component.selectedArriendo.empleado_cedula = login.persona_cedula;
  //   component.selectedArriendo.visita_id = component.selectedVisita;
  //   component.selectedArriendo.activo = true;

  //   // Registramos el empleado
  //   const registrar = component.registrarArriendo3();

  //   expect(component.registrado).toBeFalsy();
  // });

  // fit('Registrar arriendo con inmueble ya arrendado', () => {

  //   // creamos el cliente
  //   component.selectedPersona.cedula = 2000;

  //   // creamos el empleado
  //    // tslint:disable-next-line:prefer-const
  //   let login = new Login();
  //    // tslint:disable-next-line:prefer-const
  //   let persona = new Persona();
  //   persona.cedula = 1234;
  //   login.persona_cedula = persona;
  //   component.usuario = login;

  //   // creamos el inmueble
  //   component.selectedInmueble.id = 1;
  //   component.selectedInmueble.matricula = '55';
  //   component.selectedArriendo.inmueble_id = component.selectedInmueble;

  //   // creamos la visita
  //   component.selectedVisita = new Visita();

  //   // Creamos el arriendo
  //   component.selectedArriendo.cliente_cedula = component.selectedPersona.cedula;

  //   component.selectedArriendo.empleado_cedula = login.persona_cedula;
  //   component.selectedArriendo.visita_id = component.selectedVisita;
  //   component.selectedArriendo.activo = true;

  //   // Registramos el empleado
  //   const registrar = component.registrarArriendo3();
  //   expect(component.registrado).toBeFalsy();
  // });

  // fit('Registrar arriendo con inmueble ya vendido', () => {

  //   // creamos el cliente
  //   component.selectedPersona.cedula = 2000;

  //   // creamos el empleado
  //    // tslint:disable-next-line:prefer-const
  //   let login = new Login();
  //    // tslint:disable-next-line:prefer-const
  //   let persona = new Persona();
  //   persona.cedula = 1234;
  //   login.persona_cedula = persona;
  //   component.usuario = login;

  //   // creamos el inmueble
  //   component.selectedInmueble.id = 2;
  //   component.selectedInmueble.matricula = '66';
  //   component.selectedArriendo.inmueble_id = component.selectedInmueble;

  //   // creamos la visita
  //   component.selectedVisita = new Visita();

  //   // Creamos el arriendo
  //   component.selectedArriendo.cliente_cedula = component.selectedPersona.cedula;

  //   component.selectedArriendo.empleado_cedula = login.persona_cedula;
  //   component.selectedArriendo.visita_id = component.selectedVisita;
  //   component.selectedArriendo.activo = true;

  //   // Registramos el empleado
  //   const registrar = component.registrarArriendo3();
  //   expect(component.registrado).toBeFalsy();
  // });

  // fit('Registrar arriendo sin llenar datos del contrato', () => {

  //   // creamos el cliente
  //   component.selectedPersona.cedula = 2000;

  //   // creamos el empleado
  //    // tslint:disable-next-line:prefer-const
  //   let login = new Login();
  //    // tslint:disable-next-line:prefer-const
  //   let persona = new Persona();
  //   persona.cedula = 1234;
  //   login.persona_cedula = persona;
  //   component.usuario = login;

  //   // creamos el inmueble
  //   component.selectedInmueble.id = 3;
  //   component.selectedInmueble.matricula = '77';
  //   component.selectedArriendo.inmueble_id = component.selectedInmueble;

  //   // creamos la visita
  //   component.selectedVisita = new Visita();

  //   // Creamos el arriendo
  //   component.selectedArriendo.cliente_cedula = component.selectedPersona.cedula;

  //   component.selectedArriendo.empleado_cedula = login.persona_cedula;
  //   component.selectedArriendo.visita_id = component.selectedVisita;
  //   component.selectedArriendo.activo = true;

  //   // Registramos el empleado
  //   const registrar = component.registrarArriendo3();
  //   expect(component.registrado).toBeFalsy();
  // });

  // it('Registrar arriendo correctamente', () => {

  //   // creamos el cliente
  //   component.selectedPersona.cedula = 2000;

  //   // creamos el empleado
  //    // tslint:disable-next-line:prefer-const
  //   let login = new Login();
  //    // tslint:disable-next-line:prefer-const
  //   let persona = new Persona();
  //   persona.cedula = 1234;
  //   login.persona_cedula = persona;
  //   component.usuario = login;

  //   // creamos el inmueble
  //   component.selectedInmueble.id = 3;
  //   component.selectedInmueble.matricula = '77';
  //   component.selectedArriendo.inmueble_id = component.selectedInmueble;

  //   // creamos la visita
  //   component.selectedVisita = new Visita();

  //   // Creamos el arriendo
  //   component.selectedArriendo.cliente_cedula = component.selectedPersona.cedula;

  //   component.selectedArriendo.empleado_cedula = login.persona_cedula;
  //   component.selectedArriendo.visita_id = component.selectedVisita;
  //   component.selectedArriendo.activo = true;

  //   // Creamos el contrato
  //   component.selectedContrato.precio = 1500000;
  //   component.selectedContrato.descripcion = 'Se realiza el contrato del arriendo';
  //   component.labelFile = 'contratico_arriendo.pdf';

  //   // Registramos el empleado
  //   const registrar = component.registrarArriendo3();
  //   expect(component.registrado).toBeTruthy();
  // });

  // fit('Buscar cliente sin ingresar la cedula', () => {

  //   // Buscamos el cliente
  //   const buscado = component.buscarCliente();
  //   expect(component.clienteBuscado).toBeFalsy();
  // });

  // fit('Buscar cliente que no existe', () => {

  //   // Buscamos el cliente
  //   component.selectedPersona.cedula = 945457;
  //   const buscado = component.buscarCliente();
  //   expect(component.clienteBuscado).toBeFalsy();
  // });

  // fit('Buscar cliente correctamente', () => {

  //   // Buscamos el cliente
  //   component.selectedPersona.cedula = 2000;
  //   component.clienteBuscado = true;
  //   const buscado = component.buscarCliente();
  //   expect(component.clienteBuscado).toBeTruthy();
  //   console.log(component.selectedPersona);
  // });

  // fit('Buscar inmueble sin ingresar la matricula', () => {

  //   // Buscamos el inmueble
  //   const buscado = component.buscarInmueble();
  //   expect(component.inmuebleBuscado).toBeFalsy();
  // });

  // fit('Buscar inmueble que no existe', () => {

  //   // Buscamos el inmueble
  //   component.selectedInmueble.id = 567;
  //   component.selectedInmueble.matricula = '567';
  //   const buscado = component.buscarInmueble();
  //   expect(component.inmuebleBuscado).toBeFalsy();
  // });

  // fit('Buscar inmueble correctamente', () => {

  //   // Buscamos el inmueble
  //   component.selectedInmueble.id = 1;
  //   component.selectedInmueble.matricula = '55';
  //   component.inmuebleBuscado = true;
  //   const buscado = component.buscarInmueble();
  //   expect(component.inmuebleBuscado).toBeTruthy();
  // });

  // fit('Buscar arriendo sin indicar el id', () => {

  //   // Buscamos el arriendo
  //   component.selectedArriendo.id = null;
  //   component.buscarArriendo();
  //   expect(component.buscado).toBeFalsy();
  // });

  // fit('Buscar arriendo que no existe', () => {

  //   // Buscamos el arriendo
  //   component.selectedArriendo.id = 1234;
  //   component.buscarArriendo();
  //   expect(component.buscado).toBeFalsy();
  // });

  // fit('Buscar arriendo correctamente', () => {

  //   // Buscamos el arriendo
  //   component.selectedArriendo.id = 22;
  //   component.buscado = true;
  //   component.buscarArriendo();
  //   expect(component.buscado).toBeTruthy();
  // });

  // fit('Buscar arriendo visita prueba', () => {

  //   // Buscamos el arriendo
  //   component.selectedArriendo.id = 22;
  //   component.buscado = true;
  //   component.buscarArriendoVisitaPrueba();
  //   expect(component.buscado).toBeTruthy();
  // });

  // fit('Ver arriendo', () => {

  //   // creamos el cliente
  //    // tslint:disable-next-line:prefer-const
  //   let cliente = new Persona();
  //   cliente.cedula = 1095;
  //   // creamos el empleado
  //    // tslint:disable-next-line:prefer-const
  //   let login = new Login();
  //    // tslint:disable-next-line:prefer-const
  //   let persona = new Persona();
  //   persona.cedula = 1096;
  //   login.persona_cedula = persona;
  //   component.usuario = login;
  //   // creamos el inmueble
  //    // tslint:disable-next-line:prefer-const
  //   let inmueble = new Inmueble();
  //   inmueble.id = 1;
  //   inmueble.matricula = '55';
  //   // creamos la visita
  //    // tslint:disable-next-line:prefer-const
  //   let visita = new Visita();
  //   // Creamos el arriendo
  //   // tslint:disable-next-line:prefer-const
  //   let arriendo = new Arriendo();
  //   arriendo.id = 22;
  //   arriendo.cliente_cedula = cliente.cedula;
  //   arriendo.empleado_cedula = login.persona_cedula;
  //   arriendo.visita_id = visita;
  //   arriendo.activo = true;
  //   arriendo.inmueble_id = inmueble;
  //   component.buscado = true;
  //   component.ver(arriendo);
  //   expect(component.buscado).toBeTruthy();
  // });

  // fit('Eliminar arriendo', () => {

  //   // creamos el empleado
  //    // tslint:disable-next-line:prefer-const
  //   let login = new Login();
  //    // tslint:disable-next-line:prefer-const
  //   let persona = new Persona();
  //   persona.cedula = 1096;
  //   login.persona_cedula = persona;
  //   component.usuario = login;
  //   // Arriendo a eliminar
  //    // tslint:disable-next-line:prefer-const
  //   let arriendo = new Arriendo();
  //   arriendo.id = 22;
  //   component.eliminado = true;
  //   component.eliminar(arriendo);
  //   expect(component.eliminado).toBeTruthy();
  // });

  // it('Registro de contrato', () => {

  //   // Creamos el contrato
  //   component.selectedContrato.precio = 1500000;
  //   component.selectedContrato.descripcion = 'Se realiza el contrato del arriendo';
  //   component.labelFile = 'contratico_arriendo.pdf';
  //   component.selectedContrato.activo = 1;
  //   component.contratoRegistrado = true;
  //   component.registroContrato();
  //   expect(component.contratoRegistrado).toBeTruthy();
  // });

  // fit('Editar contrato', () => {

  //   // Creamos el contrato a editar
  //   component.selectedContrato.id = 1;
  //   component.selectedContrato.precio = 1500000;
  //   component.selectedContrato.descripcion = 'Se realiza el contrato del arriendo';
  //   component.labelFile = 'contratico_arriendo.pdf';
  //   component.contratoEditado = true;
  //   component.editarContrato();
  //   expect(component.contratoEditado).toBeTruthy();
  // });

  // fit('Editar arriendo con cliente indefinido', () => {

  //   component.arriendoDTO.cliente_cedula = undefined;
  //   component.editarArriendoPrueba();
  //   expect(component.editado).toBeFalsy();
  // });

  // fit('Editar arriendo con matricula indefinida', () => {

  //   // creamos el cliente
  //   component.arriendoDTO.cliente_cedula = 2000;
  //   component.arriendoDTO.matricula = undefined;
  //   component.editarArriendoPrueba();
  //   expect(component.editado).toBeFalsy();
  // });

  // fit('Editar arriendo sin buscar el cliente', () => {

  //   component.editarArriendoPrueba();
  //   expect(component.editado).toBeFalsy();
  // });

  // fit('Editar arriendo con id de inmueble que no existe', () => {

  //   // creamos el cliente
  //   component.arriendoDTO.cliente_cedula = 2000;
  //   // creamos el empleado
  //    // tslint:disable-next-line:prefer-const
  //   let login = new Login();
  //    // tslint:disable-next-line:prefer-const
  //   let persona = new Persona();
  //   persona.cedula = 1096;
  //   login.persona_cedula = persona;
  //   component.usuario = login;

  //   // creamos el inmueblex
  //   component.arriendoDTO.id = 22;
  //   component.arriendoDTO.inmueble_id = 7878787;
  //   component.arriendoDTO.matricula = 7878787;

  //   // visita
  //   component.selectedArriendo.visita_id = new Visita();

  //   // editamos el arriendo
  //   component.editarArriendoPrueba();
  //   expect(component.editado).toBeFalsy();
  // });

  // fit('Editar arriendo con cliente que no existe', () => {

  //   // creamos el cliente
  //   component.arriendoDTO.cliente_cedula = 187898;
  //   // creamos el empleado
  //    // tslint:disable-next-line:prefer-const
  //   let login = new Login();
  //    // tslint:disable-next-line:prefer-const
  //   let persona = new Persona();
  //   persona.cedula = 1096;
  //   login.persona_cedula = persona;
  //   component.usuario = login;

  //   // creamos el inmueble
  //   component.arriendoDTO.id = 22;
  //   component.arriendoDTO.inmueble_id = 1;
  //   component.arriendoDTO.matricula = 55;

  //   // editamos el arriendo
  //   component.editarArriendoPrueba();
  //   expect(component.editado).toBeFalsy();
  // });

  // fit('Editar arriendo con visita indefinida', () => {

  //   // creamos el cliente
  //   component.arriendoDTO.cliente_cedula = 1095;
  //   // creamos el empleado
  //    // tslint:disable-next-line:prefer-const
  //   let login = new Login();
  //    // tslint:disable-next-line:prefer-const
  //   let persona = new Persona();
  //   persona.cedula = 1096;
  //   login.persona_cedula = persona;
  //   component.usuario = login;

  //   // creamos el inmueble
  //   component.arriendoDTO.id = 22;
  //   component.arriendoDTO.inmueble_id = 1;
  //   component.arriendoDTO.matricula = 55;
  //   component.arriendoDTO.visita_id = 4545;
  //   component.selectedArriendo.visita_id = new Visita();
  //   component.editado = true;

  //   // editamos el arriendo
  //   component.editarArriendoPrueba();
  //   expect(component.editado).toBeTruthy();
  // });

  // fit('Editar arriendo con visita', () => {

  //   // creamos el cliente
  //   component.arriendoDTO.cliente_cedula = 1095;
  //   // creamos el empleado
  //    // tslint:disable-next-line:prefer-const
  //   let login = new Login();
  //    // tslint:disable-next-line:prefer-const
  //   let persona = new Persona();
  //   persona.cedula = 1096;
  //   login.persona_cedula = persona;
  //   component.usuario = login;

  //   // creamos el inmueble
  //   component.arriendoDTO.id = 22;
  //   component.arriendoDTO.inmueble_id = 1;
  //   component.arriendoDTO.matricula = 55;
  //   component.arriendoDTO.visita_id = 1;
  //   component.selectedArriendo.visita_id = new Visita();
  //   component.editado = true;

  //   // editamos el arriendo
  //   component.editarArriendoPrueba();
  //   expect(component.editado).toBeTruthy();
  // });

  // fit('Editar arriendo else grande', () => {

  //   // creamos el cliente
  //   component.arriendoDTO.cliente_cedula = 1095;
  //   // creamos el empleado
  //    // tslint:disable-next-line:prefer-const
  //   let login = new Login();
  //    // tslint:disable-next-line:prefer-const
  //   let persona = new Persona();
  //   persona.cedula = 1096;
  //   login.persona_cedula = persona;
  //   component.usuario = login;

  //   // creamos el inmueble
  //   component.arriendoDTO.id = 22;
  //   component.arriendoDTO.inmueble_id = 1;
  //   component.arriendoDTO.matricula = 66;
  //   component.arriendoDTO.visita_id = 1;
  //   component.selectedArriendo.visita_id = new Visita();
  //   component.editado = true;

  //   // editamos el arriendo
  //   component.editarArriendoPrueba();
  //   expect(component.editado).toBeTruthy();
  // });

  // fit('Editar arriendo else grande con inmueble_vendi sin vender', () => {

  //   // creamos el cliente
  //   component.arriendoDTO.cliente_cedula = 1095;
  //    // creamos el empleado
  //     // tslint:disable-next-line:prefer-const
  //    let login = new Login();
  //     // tslint:disable-next-line:prefer-const
  //    let persona = new Persona();
  //    persona.cedula = 1096;
  //    login.persona_cedula = persona;
  //    component.usuario = login;

  //   // creamos el inmueble
  //   component.arriendoDTO.id = 22;
  //   component.arriendoDTO.inmueble_id = 1;
  //   component.arriendoDTO.matricula = 66;
  //   component.arriendoDTO.visita_id = 1;
  //   component.selectedArriendo.visita_id = new Visita();
  //   component.editado = true;

  //   // editamos el arriendo
  //   component.editarArriendoPrueba();
  //   expect(component.editado).toBeTruthy();
  // });

  // fit('Editar arriendo else grande con inmueble sin vender', () => {

  //   // creamos el cliente
  //   component.arriendoDTO.cliente_cedula = 1095;
  //    // creamos el empleado
  //     // tslint:disable-next-line:prefer-const
  //    let login = new Login();
  //     // tslint:disable-next-line:prefer-const
  //    let persona = new Persona();
  //    persona.cedula = 1096;
  //    login.persona_cedula = persona;
  //    component.usuario = login;

  //   // creamos el inmueble
  //   component.arriendoDTO.id = 22;
  //   component.arriendoDTO.inmueble_id = 1;
  //   component.arriendoDTO.matricula = 77;
  //   component.arriendoDTO.visita_id = 1;
  //   component.selectedArriendo.visita_id = new Visita();
  //   component.editado = true;

  //   // editamos el arriendo
  //   component.editarArriendoPrueba();
  //   expect(component.editado).toBeTruthy();
  // });

  // fit('Editar arriendo else grande con inmueble vendido', () => {

  //   // creamos el cliente
  //   component.arriendoDTO.cliente_cedula = 1095;
  //    // creamos el empleado
  //     // tslint:disable-next-line:prefer-const
  //    let login = new Login();
  //     // tslint:disable-next-line:prefer-const
  //    let persona = new Persona();
  //    persona.cedula = 1096;
  //    login.persona_cedula = persona;
  //    component.usuario = login;

  //   // creamos el inmueble
  //   component.arriendoDTO.id = 22;
  //   component.arriendoDTO.inmueble_id = 1;
  //   component.arriendoDTO.matricula = 66;
  //   component.arriendoDTO.visita_id = 1;
  //   component.selectedArriendo.visita_id = new Visita();
  //   component.editado = true;

  //   // editamos el arriendo
  //   component.editarArriendoPrueba();
  //   expect(component.editado).toBeTruthy();
  // });

  // fit('Editar arriendo else grande con inmueble arrendado', () => {

  //   // creamos el cliente
  //   component.arriendoDTO.cliente_cedula = 1095;
  //    // creamos el empleado
  //     // tslint:disable-next-line:prefer-const
  //    let login = new Login();
  //     // tslint:disable-next-line:prefer-const
  //    let persona = new Persona();
  //    persona.cedula = 1096;
  //    login.persona_cedula = persona;
  //    component.usuario = login;

  //   // creamos el inmueble
  //   component.arriendoDTO.id = 22;
  //   component.arriendoDTO.inmueble_id = 2;
  //   component.arriendoDTO.matricula = 55;
  //   component.arriendoDTO.visita_id = 1;
  //   component.selectedArriendo.visita_id = new Visita();
  //   component.editado = true;

  //   // editamos el arriendo
  //   component.editarArriendoPrueba();
  //   expect(component.editado).toBeTruthy();
  // });

  // fit('Editar arriendo else grande con visita indefinida', () => {

  //   // creamos el cliente
  //   component.arriendoDTO.cliente_cedula = 1095;
  //    // creamos el empleado
  //     // tslint:disable-next-line:prefer-const
  //    let login = new Login();
  //     // tslint:disable-next-line:prefer-const
  //    let persona = new Persona();
  //    persona.cedula = 1096;
  //    login.persona_cedula = persona;
  //    component.usuario = login;

  //   // creamos el inmueble
  //   component.arriendoDTO.id = 22;
  //   component.arriendoDTO.inmueble_id = 1;
  //   component.arriendoDTO.matricula = 77;
  //   component.arriendoDTO.visita_id = undefined;
  //   component.editado = true;

  //   // editamos el arriendo
  //   component.editarArriendoPrueba();
  //   expect(component.editado).toBeTruthy();
  // });

  // fit('Editar arriendo else grande con cliente que no existe', () => {

  //   // creamos el cliente
  //   component.arriendoDTO.cliente_cedula = 1978;
  //    // creamos el empleado
  //     // tslint:disable-next-line:prefer-const
  //    let login = new Login();
  //     // tslint:disable-next-line:prefer-const
  //    let persona = new Persona();
  //    persona.cedula = 1096;
  //    login.persona_cedula = persona;
  //    component.usuario = login;

  //   // creamos el inmueble
  //   component.arriendoDTO.id = 22;
  //   component.arriendoDTO.inmueble_id = 1;
  //   component.arriendoDTO.matricula = 77;
  //   component.arriendoDTO.visita_id = 1;
  //   component.selectedArriendo.visita_id = new Visita();
  //   component.editado = true;

  //   // editamos el arriendo
  //   component.editarArriendoPrueba();
  //   expect(component.editado).toBeTruthy();
  // });

  // /**
  //  * METODOS APARTE TIO
  //  */

  // fit('CerrarMsj', () => {

  //   component.cerrarMsj();
  //   expect(component.cerradoMsj).toBeTruthy();
  // });

  // fit('ObtenerDatosCombosBusqueda', () => {

  //   const inmueble: Inmueble = {tipo_inmueble_id: 1, id_depto: 1, municipio_id: 1, cliente_cedula: 2000};
  //   component.selectedInmueble = inmueble;
  //   const cerrar = component.obtenerDatosCombosBusqueda();
  //   expect(component.obtuvoDatosCombosBusqueda).toBeTruthy();

  // });

  // fit('ObtenerDatosJSON', () => {

  //   const inmueble = new Inmueble();
  //   inmueble.id = 1;
  //   inmueble.observaciones = 'Un inmueble muy bueno';
  //   inmueble.matricula = '45AB';

  //   const cadena = component.obtenerDatosJSON('matricula', inmueble);
  //   expect(cadena).toEqual('45AB');

  // });


  // fit('LimpiarCamposArrendo', () => {

  //   const cerrar = component.limpiarCamposArrendo();
  //   expect(component.limpioCamposArriendos).toBeTruthy();

  // });

  // fit('LimpiarCamposDTO', () => {

  //   const cerrar = component.limpiarCamposDTO();
  //   expect(component.limpioCamposDTO).toBeTruthy();

  // });

  // fit('ObtenerPublicacionInmueble en Arriendo', () => {

  //   component.selectedInmueble.publicacion = 1;
  //   component.obtenerPublicacionInmueble();
  //   expect(component.publicarEnArriendo).toBeTruthy();

  // });

  // fit('ObtenerPublicacionInmueble en ventas', () => {

  //   component.selectedInmueble.publicacion = 2;
  //   component.obtenerPublicacionInmueble();
  //   expect(component.publicarEnVenta).toBeTruthy();

  // });

  // fit('ObtenerPublicacionInmueble en Arriendo y ventas', () => {

  //   component.selectedInmueble.publicacion = 3;
  //   component.obtenerPublicacionInmueble();
  //   expect(component.publicarEnArriendo && component.publicarEnVenta).toBeTruthy();

  // });

  // fit('LimpiarContrato', () => {
  //   component.limpiarContrato();
  //   expect(component.contratoLimpiado).toBeTruthy();
  // });

  // // it('crearArchivo', () => {

  // //   let arr = new Array<File>(1);
  // //   let f = new File(null, 'contrato.pdf');
  // //   arr[0] = f;
  // //   component.selectedFile = arr;
  // //   component.crearArchivo();
  // //   expect(component.archivoCreado).toBeTruthy();
  // // });

  // // it('crearArchivo con extension no valida', () => {

  // //   let arr = new Array<File>(1);
  // //   let f = new File(null, 'contrato.pdf');
  // //   arr[0] = f;
  // //   component.selectedFile = arr;
  // //   component.crearArchivo();
  // //   expect(component.archivoCreado).toBeTruthy();
  // // });


  // // it('convertirArchivoBase64', () => {

  // //   let file : File = new File(null, 'contrato.pdf');

  // //   component.convertirArchivoBase64(file);
  // //   expect(component.convertidoBase64).toBeTruthy();
  // // });

});
