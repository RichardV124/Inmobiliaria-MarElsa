import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaClienteComponent } from './busqueda-cliente.component';

import {
  BaseRequestOptions,
  Response,
  ResponseOptions,
  Http,
  HttpModule

} from '@angular/http';


describe('BusquedaClienteComponent', () => {
  let component: BusquedaClienteComponent;
  let fixture: ComponentFixture<BusquedaClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpClientModule],
      declarations: [ BusquedaClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Buscar cliente', () => {

    // Buscamos el emplado
    component.selectedPersona.cedula = '1144';
    const buscado = component.buscar();
     expect(component.validarBusqueda).toBeTruthy();
  });

  it('Listar clientes', () => {

    // Listando los departementos
    const buscado = component.listarClientes();
    console.log('--------------Listando--C-----------');
    expect(component.validarListarClientes).toBeTruthy();
  });

 it('Listar departamentos', () => {

    // Listando los departementos
    const buscado = component.listarDepartamentos();
    console.log('--------------Listando--D-----------');
    expect(component.validarListarDepartamentos).toBeTruthy();
  });

  it('Listar municipios', () => {

    // Listando los departementos
    const buscado = component.listarMunicipios();
    console.log('--------------Listando--M-----------');
    expect(component.validarListarMunicipios).toBeTruthy();
  });

  it('Eliminar cliente', () => {

    // Creamos el rol
    component.rol.id = 3;
    component.rol.nombre = 'cliente';
    component.rol.descripcion = 'cliente';

    // Creamos el dpto
    component.selectedDepartamento.id = 1;
    component.selectedDepartamento.nombre = 'Quindio';

    // Creamos el municipio
    component.selectedMunicipio.id = 1;
    component.selectedMunicipio.nombre = 'Montenegro';
    component.selectedMunicipio.departamento_id = component.selectedDepartamento;

     // Creamos la persona
     component.selectedPersona.nombre = 'Andres';
       component.selectedPersona.apellido = 'ciro';
       const fe = new Date('02/06/1997');
       component.selectedPersona.fecha_nacimiento = fe;
       component.selectedPersona.cedula = '2000';
       component.selectedPersona.direccion = 'calle 20';
       component.selectedPersona.telefono = 3114802039;
       component.selectedPersona.correo = 'cr@';
       component.selectedPersona.rol_id = component.rol;
       component.selectedPersona.municipio_id = component.selectedMunicipio;
       component.selectedPersona.genero = 2 ;
       component.selectedPersona.activo = 0;

    // Creamos el login
    component.selectedLogin.username = 'ciro';
    component.selectedLogin.contrasenia = '1234';
    component.selectedLogin.persona_cedula = component.selectedPersona;
    component.selectedLogin.activo = component.selectedPersona.activo;

    // Registramos el empleado
    const registrar = component.eliminar(component.selectedPersona);
    expect(component.validarEliminar).toBeTruthy();
  });
});
