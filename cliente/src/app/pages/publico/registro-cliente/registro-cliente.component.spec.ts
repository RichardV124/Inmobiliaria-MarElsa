import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from './../../../services/cliente/cliente.service';
import { Login } from './../../../modelo/login';
import { Departamento } from './../../../modelo/departamento';
import { Municipio } from './../../../modelo/municipio';
import { Rol } from './../../../modelo/rol';
import { Persona } from './../../../modelo/persona';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroClienteComponent } from './registro-cliente.component';


describe('GestionPersonalComponent', () => {


    let component: RegistroClienteComponent;
    let fixture: ComponentFixture<RegistroClienteComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, FormsModule, HttpClientModule],
        declarations: [ RegistroClienteComponent ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(RegistroClienteComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });


    it('Registrar cliente', () => {

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
         component.selectedPersona.activo = 1;

      // Creamos el login
      component.selectedLogin.username = 'ciro';
      component.selectedLogin.contrasenia = '1234';
      component.selectedLogin.persona_cedula = component.selectedPersona;
      component.selectedLogin.activo = component.selectedPersona.activo;

      // Registramos el empleado
      const registrar = component.registrar();
      expect(component.validarRegistro).toBeTruthy();
    });

    it('Validar campos', () => {

        component.selectedPersona.nombre = null;
        component.selectedPersona.apellido = null;
        component.selectedPersona.cedula = null;
        component.selectedPersona.telefono = null;
        component.selectedLogin.username = null;
        component.selectedLogin.contrasenia = null;
        component.selectedMunicipio.id = 0;

        const ver = component.validarCampos();
        expect(ver).toBeFalsy();
      });

    it('Listar departamentos', () => {

        // Listando los departementos
        const buscado = component.listarDepartamentos();
        console.log('--------------Listando D-------------');
        expect(component.validarListarDepartamento).toBeTruthy();
      });

    it('Listar municipios', () => {

        // Listando los departementos
        const ver = component.listarMunicipios();
        console.log('--------------Listando M-------------');
        expect(component.validarListarMunicipios).toBeTruthy();
      });

});
