import { Empleado } from './../../../../../modelo/empleado';
import { TipoPersonal } from './../../../../../modelo/tipo_personal';
import { Persona } from './../../../../../modelo/persona';
import { Departamento } from './../../../../../modelo/departamento';
import { Municipio } from './../../../../../modelo/municipio';
import { Login } from './../../../../../modelo/login';
import { Rol } from './../../../../../modelo/rol';
import { BuscarByNombrePipe } from './../../../../../filtros/buscar-by-nombre.pipe';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from './../../../../../services/empleado/empleado.service';
import { EmpleadoDTO } from './../../../../../modelo/dto/empleadoDTO';
import { GestionPersonalComponent } from './gestion-personal.component';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpHandler, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import {
  BaseRequestOptions,
  Response,
  ResponseOptions,
  Http,
  HttpModule

} from '@angular/http';
import { Inject } from '@angular/core';
import { Experiencia } from 'src/app/modelo/experiencia';
import { Estudio } from 'src/app/modelo/estudio';

describe('GestionPersonalComponent', () => {


  let component: GestionPersonalComponent;
  let fixture: ComponentFixture<GestionPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpClientModule],
      declarations: [ GestionPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('Registrar empleado', () => {

    // Creamos el rol
    component.rol.id = 2;
    component.rol.nombre = 'empleado';
    component.rol.descripcion = 'empleado';

    // Creamos el dpto
    component.selectedDepartamento.id = 1;
    component.selectedDepartamento.nombre = 'Quindio';

    // Creamos el municipio
    component.selectedMunicipio.id = 1;
    component.selectedMunicipio.nombre = 'Montenegro';
    component.selectedMunicipio.departamento_id = component.selectedDepartamento;

     // Creamos la persona
     component.selectedPersona.nombre = 'Carlitos';
       component.selectedPersona.apellido = 'Arias';
       const fe = new Date('02/06/1997');
       component.selectedPersona.fecha_nacimiento = fe;
       component.selectedPersona.cedula = 555;
       component.selectedPersona.direccion = 'calle 20';
       component.selectedPersona.telefono = 3114802039;
       component.selectedPersona.correo = 'clts1000@';
       component.selectedPersona.rol_id = component.rol;
       component.selectedPersona.municipio_id = component.selectedMunicipio;
       component.selectedPersona.genero = 2 ;
       component.selectedPersona.activo = 1;

    // Creamos el login
    component.selectedLogin.username = 'cr1000';
    component.selectedLogin.contrasenia = '1234';
    component.selectedLogin.persona_cedula = component.selectedPersona;
    component.selectedLogin.activo = component.selectedPersona.activo;

    // Creamos el tipo personal
    component.tipoPersonalSeleccionado.id = 2;
    component.tipoPersonalSeleccionado.descripcion = 'empleado';

    // Creamos la persona
    component.empleadoDTO.nombre = component.selectedPersona.nombre;
    component.empleadoDTO.apellido = component.selectedPersona.apellido;
    component.empleadoDTO.fecha_nacimiento = component.selectedPersona.fecha_nacimiento;
    component.empleadoDTO.cedula = component.selectedPersona.cedula;
    component.empleadoDTO.direccion = component.selectedPersona.direccion;
    component.empleadoDTO.telefono = component.selectedPersona.telefono;
    component.empleadoDTO.correo = component.selectedPersona.correo;
    component.empleadoDTO.rol_id = component.selectedPersona.rol_id.id;
    component.empleadoDTO.municipio_id = component.selectedPersona.municipio_id.id;
    component.empleadoDTO.genero =  component.selectedPersona.genero;
    component.empleadoDTO.username = component.selectedLogin.username;
    component.empleadoDTO.contrasenia = component.selectedLogin.contrasenia;
    component.empleadoDTO.tipo_id = component.tipoPersonalSeleccionado.id;
    component.empleadoDTO.descripcion_tipo = component.tipoPersonalSeleccionado.descripcion;
    component.empleadoDTO.nombre_municipio = 'Montenegro';
    component.empleadoDTO.activo = component.selectedPersona.activo;
    // Registramos el empleado
    const registrar = component.registrar();
    expect(component.validarRegistro).toBeTruthy();
  });

  it('Buscar empleado', () => {

    // Buscamos el emplado
    component.cedulaBuscar = '1001';
    const buscado = component.buscar();
    console.log(component.empleadoDTO.cedula);
    console.log('--------------BUSCADO-------------');
    console.log(buscado + '........-----------------------.......');
    expect(component.validarBusqueda).toBeTruthy();
  });

  it('Editar empleado', () => {

    // Creamos el rol
    component.rol.id = 2;
    component.rol.nombre = 'empleado';
    component.rol.descripcion = 'empleado';

    // Creamos el dpto
    component.selectedDepartamento.id = 1;
    component.selectedDepartamento.nombre = 'Quindio';

    // Creamos el municipio
    component.selectedMunicipio.id = 1;
    component.selectedMunicipio.nombre = 'Montenegro';
    component.selectedMunicipio.departamento_id = component.selectedDepartamento;

    // Creamos el tipo de personal
    component.tipoPersonalSeleccionado.id = 1;
    component.tipoPersonalSeleccionado.descripcion = 'Empleador';

     // Creamos la persona
     component.selectedPersona.nombre = 'Fredy';
       component.selectedPersona.apellido = 'Pineda';
       const fe = new Date('02/06/1997');
       component.selectedPersona.fecha_nacimiento = fe;
       component.selectedPersona.cedula = '444';
       component.selectedPersona.direccion = 'calle 20';
       component.selectedPersona.telefono = 3114802039;
       component.selectedPersona.correo = 'fp@';
       component.selectedPersona.rol_id = component.rol;
       component.selectedPersona.municipio_id = component.selectedMunicipio;
       component.selectedPersona.genero = 2 ;
       component.selectedPersona.activo = 1;

    // Creamos el login
    component.selectedLogin.username = 'fp';
    component.selectedLogin.contrasenia = '1234';
    component.selectedLogin.persona_cedula = component.selectedPersona;
    component.selectedLogin.activo = component.selectedPersona.activo;

    // Creamos la persona
    component.empleadoDTO.nombre = component.selectedPersona.nombre;
    component.empleadoDTO.apellido = component.selectedPersona.apellido;
    component.empleadoDTO.fecha_nacimiento = component.selectedPersona.fecha_nacimiento;
    component.empleadoDTO.cedula = component.selectedPersona.cedula;
    component.empleadoDTO.direccion = component.selectedPersona.direccion;
    component.empleadoDTO.telefono = component.selectedPersona.telefono;
    component.empleadoDTO.correo = component.selectedPersona.correo;
    component.empleadoDTO.rol_id = 2;
    component.empleadoDTO.municipio_id = component.selectedPersona.municipio_id.id;
    component.empleadoDTO.genero =  component.selectedPersona.genero;
    component.empleadoDTO.username = component.selectedLogin.username;
    component.empleadoDTO.contrasenia = component.selectedLogin.contrasenia;
    component.empleadoDTO.descripcion_tipo = component.tipoPersonalSeleccionado.descripcion;
    component.empleadoDTO.nombre_municipio = 'Montenegro';
    component.empleadoDTO.activo = component.selectedPersona.activo;
    component.empleadoDTO.tipo_id =  component.tipoPersonalSeleccionado.id;
    // Registramos el empleado
    const registrar = component.editar();
    expect(component.validarEditar).toBeTruthy();
    console.log(component.validarEditar);
    console.log('----------------------------editado');

  });

  it('Validar campos', () => {

    component.selectedPersona.nombre = null;
    component.selectedPersona.apellido = null;
    component.selectedPersona.fecha_nacimiento = null;
    component.selectedPersona.cedula = null;
    component.selectedPersona.telefono = null;
    component.selectedPersona.direccion = null;
    component.selectedPersona.correo = null;
    component.selectedLogin.username = null;
    component.selectedLogin.contrasenia = null;

    const ver = component.validarCampos();
    // expect(registrar).toBeFalsy();
    expect(ver).toBeFalsy();
  });

  it('Listar empleados', () => {

    // Listando los empleados
    const buscado = component.listarEmpleados();
    console.log('--------------Listando-------------');
    expect(component.validarlistarEmpledos).toBeTruthy();
  });

  it('Listar tipo personal', () => {

    // Listando los empleados
    const buscado = component.listarTipoPersonal();
    console.log('--------------Listando-------------');
    expect(component.validarlistarTipoPersonal).toBeTruthy();
  });

  it('Listar departamentos', () => {

    // Listando los departementos
    const buscado = component.listarDepartamentos();
    console.log('--------------Listando-------------');
    expect(component.validarlistarDepartamentos).toBeTruthy();
  });

  it('registrar experiencia', () => {

    const experiencia = new Experiencia();
    experiencia.fecha_inicio = new Date();
    experiencia.fecha_fin = new Date();
    experiencia.cargo = 'admin';
    experiencia.direccion = 'caare';
    experiencia.nom_empresa = 'eam';
    experiencia.nombre_certificado = 'certi';

    const persona = new Persona();
    persona.cedula = 555;

    experiencia.persona_cedula = persona;
    experiencia.telefono = '123';

    component.selectedPersona = persona;
    component.experienciaSeleccionada = experiencia;

    component.registrarExperiencia();

    expect(component.validarRegistroExperiencia).toBeTruthy();

  });

  it('Listar municipios', () => {

    // Listando los municipios
    const buscado = component.listarMunicipios();
    console.log('--------------Listando-------------');
    expect(component.validarlistarMunicipios).toBeTruthy();
  });

  it('Listar experiencias', () => {

    // Listando los municipios
    const buscado = component.listarExperienciasEmpleado('111');
    console.log('--------------Listando-------Ex------');
    expect(component.validarlistarExperiencias).toBeTruthy();
  });

  it('Eliminar empleado', () => {

    // const servicio: EmpleadoService = TestBed.get(EmpleadoService);

   // Creamos el rol
   component.rol.id = 2;
   component.rol.nombre = 'empleado';
   component.rol.descripcion = 'empleado';

   // Creamos el dpto
   component.selectedDepartamento.id = 1;
   component.selectedDepartamento.nombre = 'Quindio';

   // Creamos el municipio
   component.selectedMunicipio.id = 1;
   component.selectedMunicipio.nombre = 'Montenegro';
   component.selectedMunicipio.departamento_id = component.selectedDepartamento;

    // Creamos la persona
    component.selectedPersona.nombre = 'Fredy';
      component.selectedPersona.apellido = 'Pineda';
      const fe = new Date('02/06/1997');
      component.selectedPersona.fecha_nacimiento = fe;
      component.selectedPersona.cedula = '444';
      component.selectedPersona.direccion = 'calle 20';
      component.selectedPersona.telefono = 3114802039;
      component.selectedPersona.correo = 'fp@';
      component.selectedPersona.rol_id = component.rol;
      component.selectedPersona.municipio_id = component.selectedMunicipio;
      component.selectedPersona.genero = 2 ;
      component.selectedPersona.activo = 1;

   // Creamos el login
   component.selectedLogin.username = 'fp';
   component.selectedLogin.contrasenia = '1234';
   component.selectedLogin.persona_cedula = component.selectedPersona;
   component.selectedLogin.activo = component.selectedPersona.activo;

   // Creamos el tipo personal
   component.tipoPersonalSeleccionado.id = 2;
   component.tipoPersonalSeleccionado.descripcion = 'empleado';

   // Creamos la persona
   component.empleadoDTO.nombre = component.selectedPersona.nombre;
   component.empleadoDTO.apellido = component.selectedPersona.apellido;
   component.empleadoDTO.fecha_nacimiento = component.selectedPersona.fecha_nacimiento;
   component.empleadoDTO.cedula = component.selectedPersona.cedula;
   component.empleadoDTO.direccion = component.selectedPersona.direccion;
   component.empleadoDTO.telefono = component.selectedPersona.telefono;
   component.empleadoDTO.correo = component.selectedPersona.correo;
   component.empleadoDTO.rol_id = component.selectedPersona.rol_id.id;
   component.empleadoDTO.municipio_id = component.selectedPersona.municipio_id.id;
   component.empleadoDTO.genero =  component.selectedPersona.genero;
   component.empleadoDTO.username = component.selectedLogin.username;
   component.empleadoDTO.contrasenia = component.selectedLogin.contrasenia;
   component.empleadoDTO.tipo_id = component.tipoPersonalSeleccionado.id;
   component.empleadoDTO.descripcion_tipo = component.tipoPersonalSeleccionado.descripcion;
   component.empleadoDTO.nombre_municipio = 'Montenegro';
   component.empleadoDTO.activo = component.selectedPersona.activo;

     const ver  = component.eliminar(component.empleadoDTO);
     console.log('-----------------------1-----------------------');
     expect(component.validarEliminar).toBeTruthy();

   });

   it('Registro experiencias', () => {
    component.experienciaSeleccionada.persona_cedula = component.selectedPersona;
    const ver = component.registrarExperiencia();
    expect(true).toBeTruthy();
    });

    it('Registro estudios', () => {
      component.estudioSeleccionado.persona_cedula = component.selectedPersona;
      const ver = component.registrarEstudio();
      expect(true).toBeTruthy();
      });

      it('Listar los tipos ed personal', () => {
        const ver = component.listarTipoPersonal();
        expect(true).toBeTruthy();
        });

        it('Listar municipiosl', () => {
          const ver = component.listarMunicipios();
          expect(true).toBeTruthy();
          });

          it('Listar departamentos', () => {
            const ver = component.listarDepartamentos();
            expect(true).toBeTruthy();
            });

            it('Listar empleados', () => {
              const ver = component.listarEmpleados();
              expect(true).toBeTruthy();
              });

              it('Validar campos experiencias', () => {
                const ver = component.validarCamposExperiencias();
                expect(true).toBeTruthy();
                });

                it('Validar campos experiencias', () => {
                  const ver = component.validarCamposExperiencias();
                  expect(true).toBeTruthy();
                  });

                  it('Validar campos estudios', () => {
                    const ver = component.validarCamposEstudios();
                    expect(true).toBeTruthy();
                    });

                    it('Validar registro', () => {
                      const ver = component.validarRegistro();
                      expect(true).toBeTruthy();
                      });

                      it('Validar busqueda', () => {
                        const ver = component.validarBusqueda();
                        expect(true).toBeTruthy();
                        });

                        it('Validar eliminar', () => {
                          const ver = component.validarEliminar();
                          expect(true).toBeTruthy();
                          });

                          it('Validar editar', () => {
                            const ver = component.validarEditar();
                            expect(true).toBeTruthy();
                            });

                            it('Validar lista empleados', () => {
                              const ver = component.validarlistarEmpledos();
                              expect(true).toBeTruthy();
                              });

                              it('Validar lista tipo personal', () => {
                                const ver = component.validarlistarTipoPersonal();
                                expect(true).toBeTruthy();
                                });

                                it('Validar lista municipios', () => {
                                  const ver = component.validarlistarMunicipios();
                                  expect(true).toBeTruthy();
                                  });

                                  it('Validar lista departamentos', () => {
                                    const ver = component.validarlistarDepartamentos();
                                    expect(true).toBeTruthy();
                                    });

                                    it('Validar registro experiencias', () => {
                                      const ver = component.validarRegistroExperiencia();
                                      expect(true).toBeTruthy();
                                      });

                                      it('Validar listar experiencias', () => {
                                        const ver = component.validarlistarExperiencias();
                                        expect(true).toBeTruthy();
                                        });

                                        it('Validar listar estudios', () => {
                                          component.selectedPersona.nombre = 'Fredy';
                                          component.selectedPersona.apellido = 'Pineda';
                                          const fe = new Date('02/06/1997');
                                          component.selectedPersona.fecha_nacimiento = fe;
                                          component.selectedPersona.cedula = '444';
                                          component.selectedPersona.direccion = 'calle 20';
                                          component.selectedPersona.telefono = 3114802039;
                                          component.selectedPersona.correo = 'fp@';
                                          component.selectedPersona.rol_id = component.rol;
                                          component.selectedPersona.municipio_id = component.selectedMunicipio;
                                          component.selectedPersona.genero = 2 ;
                                          component.selectedPersona.activo = 1;
                                          const ver = component.validarlistarEstudios();
                                          expect(true).toBeTruthy();
                                          });

});

