import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarClienteComponent } from './editar-cliente.component';

import {
  BaseRequestOptions,
  Response,
  ResponseOptions,
  Http,
  HttpModule

} from '@angular/http';


describe('EditarClienteComponent', () => {
  let component: EditarClienteComponent;
  let fixture: ComponentFixture<EditarClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpClientModule],
      declarations: [ EditarClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Buscar Editar', () => {

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
      component.selectedPersona.nombre = 'Andy';
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
        component.selectedPersona.activo = 1;

     // Creamos el login
     component.user.username = 'ciro';
     component.user.contrasenia = '1234';
     component.user.persona_cedula = component.selectedPersona;
     component.user.activo = component.selectedPersona.activo;

    expect(component.verificarEditar).toBeTruthy();
  });

  it('Listar departamentos', () => {

    // Listando los departementos
    const buscado = component.listarDepartamentos();
    console.log('--------------Listando-------------');
    expect(component.verificarListarDepartamentos).toBeTruthy();
  });

  it('Listar municipios', () => {

    // Listando los municipios
    const buscado = component.listarMunicipios();
    console.log('--------------Listando-------------');
    expect(component.verificarListarMunicipios).toBeTruthy();
  });
});
