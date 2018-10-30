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

  it('Registrar empleado', () => {

    // creamos el cliente
    component.selectedPersona.cedula = 1095;

    // creamos el empleado
    let login = new Login();
    let persona = new Persona();
    persona.cedula = 1096;
    login.persona_cedula = persona;
    component.usuario = login;

    // creamos el inmueble
    component.selectedInmueble.id = 1;
    component.selectedInmueble.matricula = '1';
    component.selectedArriendo.inmueble_id = component.selectedInmueble;

    // creamos la visita
    component.selectedVisita.id = 1;

    // Creamos el arriendo
    component.selectedArriendo.cliente_cedula = component.selectedPersona.cedula;

    component.selectedArriendo.empleado_cedula = login.persona_cedula;
    component.selectedArriendo.visita_id = component.selectedVisita;
    component.selectedArriendo.activo = true;

    // Registramos el empleado
    const registrar = component.registrarArriendo3();
    console.log('LA CONCHAAAA !!!!333');
    console.log(component.registrado);

    component.buscarArriendo();
    expect(component.registrado).toBeTruthy();
  });

  it('Buscar arriendo', () => {

    // Buscamos el arriendo
    component.selectedArriendo.id = 20;
    const buscado = component.buscarArriendo();
    console.log('BUSCADO');
    console.log(component.selectedArriendo);
    expect(component.buscado).toBeTruthy();
  });

});
